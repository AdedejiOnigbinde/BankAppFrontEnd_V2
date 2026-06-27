import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillService } from '../services/bill/bill.service';
import { billDto, paidBillDto, payBillRequest } from '../types';

@Component({
  selector: 'app-pay-bill',
  templateUrl: './pay-bill.component.html',
  styleUrls: ['./pay-bill.component.css']
})
export class PayBillComponent implements OnInit {
  savedBills: billDto[] = [];
  billHistory: paidBillDto[] = [];
  payBillForm: FormGroup;

  isLoading = false;
  isDeletingId: number | null = null;
  isSubmitted = false;
  showPin = false;
  successMessage = '';
  errorMessage = '';

  readonly CATEGORIES = [
    'Utilities', 'Internet', 'Cable TV', 'Phone',
    'Insurance', 'Rent', 'Water', 'Gas', 'Other'
  ];

  constructor(private billService: BillService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
    this.loadSavedBills();
    this.loadBillHistory();
  }

  private buildForm(): void {
    this.payBillForm = this.fb.group({
      biller:   ['',   [Validators.required]],
      amount:   [null, [Validators.required, Validators.min(1)]],
      pin:      [null, [Validators.required, Validators.pattern(/^\d+$/), Validators.min(0), Validators.max(9999)]],
      saveBill: [false],
      nickName: [''],
      category: ['']
    });

    // Make nickName and category required when saveBill is checked
    this.payBillForm.controls['saveBill'].valueChanges.subscribe((save: boolean) => {
      const nickName = this.payBillForm.controls['nickName'];
      const category = this.payBillForm.controls['category'];
      if (save) {
        nickName.setValidators([Validators.required]);
        category.setValidators([Validators.required]);
      } else {
        nickName.clearValidators();
        category.clearValidators();
      }
      nickName.updateValueAndValidity();
      category.updateValueAndValidity();
    });
  }

  loadSavedBills(): void {
    this.billService.getSavedBills().subscribe({
      next: (bills) => { this.savedBills = bills; },
      error: () => { }
    });
  }

  loadBillHistory(): void {
    this.billService.getPaidBills().subscribe({
      next: (history) => { this.billHistory = history; },
      error: () => { }
    });
  }

  selectSavedBill(bill: billDto): void {
    this.payBillForm.patchValue({ biller: bill.biller });
  }

  deleteSavedBill(billId: number, event: Event): void {
    event.stopPropagation();
    this.isDeletingId = billId;
    this.billService.deleteBill(billId).subscribe({
      next: () => {
        this.savedBills = this.savedBills.filter(b => b.billId !== billId);
        this.isDeletingId = null;
      },
      error: () => { this.isDeletingId = null; }
    });
  }

  submitPayment(): void {
    this.successMessage = '';
    this.errorMessage = '';
    this.isSubmitted = true;

    if (this.payBillForm.invalid) return;

    this.isLoading = true;
    const { biller, amount, pin, saveBill, nickName, category } = this.payBillForm.value;

    const payload: payBillRequest = { amount, biller, pin, saveBill };
    if (saveBill) {
      payload.nickName = nickName;
      payload.category = category;
    }

    this.billService.payBill(payload).subscribe({
      next: (res: string) => {
        this.isLoading = false;
        this.isSubmitted = false;
        this.successMessage = res || 'Bill paid successfully.';
        this.payBillForm.reset({ saveBill: false, biller: '', amount: null, pin: null, nickName: '', category: '' });
        this.loadSavedBills();
        this.loadBillHistory();
      },
      error: (err) => {
        this.isLoading = false;
        this.isSubmitted = false;
        this.errorMessage = err.error || 'Payment failed. Please check your PIN and balance.';
      }
    });
  }

  get saveBillChecked(): boolean {
    return this.payBillForm.controls['saveBill'].value;
  }
}

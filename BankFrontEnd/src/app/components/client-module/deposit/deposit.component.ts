import { Component, OnInit } from '@angular/core';
import { depositRequestDto } from '../types';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { DepositService } from '../services/deposit/deposit.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
  depositTransactions: depositRequestDto[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  depositRequestForm: FormGroup;
  depositRequestFormSubmitted: boolean;
  constructor(private formBuilder: FormBuilder, private depositServe: DepositService) { }

  ngOnInit(): void {
    this.getAllDepositRequest();
    this.depositRequestForm = this.formBuilder.group({
      checkNumber: ['', [Validators.required, Validators.minLength(21), Validators.maxLength(25), Validators.pattern(/^[0-9]+$/)]],
      checkBank: ['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
      checkAmount: [0, [Validators.required, Validators.min(1)]],
      description: ['', [Validators.pattern(/^[A-Za-z\s]+$/)]],
      splitCheckingAmount: [0, [Validators.min(0)]],
      splitSavingsAmount: [0, [Validators.min(0)]]
    })
  }

  getAllDepositRequest() {
    this.depositServe.getAllClientDepositRequest().subscribe({
      next: (res: depositRequestDto[]) => {
        this.depositTransactions = res;
      },
      error: (err) => {
        this.errorMessage = err.error
      }
    })

  }

  createDepositRequest() {
    this.errorMessage = '';
    this.successMessage = '';
    this.depositRequestFormSubmitted = true;
    if (this.depositRequestForm.valid) {
      this.depositServe.createDepositRequest(this.depositRequestForm.value).subscribe({
        next: (res: string) => {
          this.successMessage = res;
          this.depositRequestFormSubmitted = false;
          this.getAllDepositRequest();
        },
        error: (err) => {
          this.errorMessage = err.error;
          this.depositRequestFormSubmitted = false;
        }
      })

    }
  }

}

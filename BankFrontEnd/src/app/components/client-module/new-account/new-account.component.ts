import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account/account.service';
@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit {
  accountCreationForm: FormGroup;
  sucessMessage: string;
  errorMessage: string;
  isSubmitted: boolean;
  @ViewChild('popupModal') popupModal: ElementRef;
  constructor(private formBuilder: FormBuilder, private accountServe: AccountService) { }

  ngOnInit(): void {
    this.accountCreationForm = this.formBuilder.group({
      accountType: ['', Validators.required],
      termsBox: [false, Validators.requiredTrue],
      privacyBox: [false, Validators.requiredTrue]
    })
  }

  createAccount(): void {
    this.errorMessage = '';
    this.isSubmitted = true;

    if (this.accountCreationForm.valid) {
      
      this.accountServe.createAccount(this.accountCreationForm.controls['accountType'].value).subscribe({
        next: (res: string) => {
          this.openModal();
          this.isSubmitted = false;
          this.accountCreationForm.reset();
          this.sucessMessage = res;
        },
        error: (err) => {
          this.errorMessage = err.error;
        }
      })

    }

  }

  openModal(): void {
    this.popupModal.nativeElement.classList.remove('hidden');
  }

  closeModal(): void {
    this.popupModal.nativeElement.classList.add('hidden');
  }

}

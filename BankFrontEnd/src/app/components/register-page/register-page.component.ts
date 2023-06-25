import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  errorMessage!: string;
  successMessage!: string;
  registerForm!: FormGroup;
  extraInfoForm!: FormGroup
  submitted = false;
  constructor(private formBuilder: FormBuilder, private authservice: AuthServiceService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/), Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/), Validators.minLength(4)]],
      userName: ['', [Validators.required, Validators.pattern(/^[A-Za-z]+$/), Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      address: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+/)]],
      pinNumber: [0, [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(4), Validators.maxLength(4)]],
      ssn: [0, [Validators.required, Validators.pattern(/^\d+$/), Validators.minLength(9), Validators.maxLength(9)]],
    })
    this.extraInfoForm = this.formBuilder.group({
      cPassword: ['', Validators.required],
      clientType: ['', Validators.required],
    })

  }

  register(): void {
    this.submitted = true
    if (this.extraInfoForm.controls['cPassword'].value != this.registerForm.controls['password'].value) {
      this.errorMessage = "Passwords Do Not Match";
    } else if (this.registerForm.invalid) {
      this.errorMessage = "Some fields Are Invalid"
    } else {
      this.authservice.register(this.registerForm.value, this.extraInfoForm.controls['clientType'].value).subscribe({
        next: (res) => {
          this.successMessage = res[0];
          this.registerForm.reset();
          this.extraInfoForm.reset();
          this.submitted = false
        },
        error: (err) => {
          this.errorMessage = err.error;
        }
      })
    }

  }

}

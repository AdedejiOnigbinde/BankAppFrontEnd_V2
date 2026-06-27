import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { AuthStateService } from 'src/app/services/auth-state/auth-state.service';
import { loginResponse } from '../types';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorMessage = '';
  loginForm: FormGroup;
  submitted = false;
  showPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private authState: AuthStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(): void {
    this.submitted = true;
    this.errorMessage = '';
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: loginResponse) => {
          // JWT is set as HttpOnly cookie by the server — just store the role locally
          this.authState.setRole(res.role);
          if (res.role === 'USER') {
            this.router.navigate(['client']);
          } else if (res.role === 'ADMIN') {
            this.router.navigate(['admin']);
          }
        },
        error: (err) => {
          this.errorMessage = err.error;
        }
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service/auth-service.service';
import { setCookie } from 'typescript-cookie'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  errorMessage!: string;
  loginForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private authservice: AuthServiceService, private route: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login(): void {
    this.submitted = true;
    this.errorMessage = '';
    if (this.loginForm.valid) {
      this.authservice.login(this.loginForm.value).subscribe({
        next: (res) => {
          setCookie('userToken', res[0], { expires: 1 });
          //implement conditional Routing
          if (res[1] == "USER") {
            this.route.navigate(['client'])
          } 
          // else if (res[1] == "ADMIN") {
          // //   // this.route.navigate(['dashboardAdmin'])
          // // }

        },
        error: (err) => {
          this.errorMessage = err.error
          console.log(err)
        },
      })
    }

  }

}

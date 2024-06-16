import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginFormData, loginResponse, registerFormData } from 'src/app/components/types';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) { }

  login(loginData: loginFormData): Observable<loginResponse> {
    return this.http.post<loginResponse>("auth/login", loginData)
  }

  register(registerData: registerFormData, userType: string): Observable<string> {
    let registerLink = null;
    if (userType == "Admin") {
      registerLink = "register-admin"
    } else if (userType == "Client") {
      registerLink = "register"
    }
    return this.http.post(`auth/${registerLink}`, registerData, { responseType: 'text' })
  }
} 

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) { }

  login(loginData: any): Observable<any> {
    return this.http.post<Observable<any>>("http://localhost:8080/auth/login", loginData)
  }

  register(registerData: any, userType: string): Observable<any> {
    let registerLink = null;
    if (userType == "Admin") {
      registerLink = "registerAdmin"
    } else if (userType == "Client") {
      registerLink = "register"
    }
    return this.http.post<Observable<any>>(`http://localhost:8080/auth/${registerLink}`, registerData)
  }
} 

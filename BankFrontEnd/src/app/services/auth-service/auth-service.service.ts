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
    return this.http.post<loginResponse>('auth/login', loginData);
  }

  logout(): Observable<void> {
    return this.http.post<void>('auth/logout', {});
  }

  register(registerData: registerFormData, userType: string): Observable<string> {
    const endpointMap: Record<string, string> = {
      Admin:  'auth/register-admin',
      Client: 'auth/register'
    };
    const endpoint = endpointMap[userType];
    if (!endpoint) {
      throw new Error(`Unknown user type: ${userType}`);
    }
    return this.http.post(endpoint, registerData, { responseType: 'text' });
  }
}

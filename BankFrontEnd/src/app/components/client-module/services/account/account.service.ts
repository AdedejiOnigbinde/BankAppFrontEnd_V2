import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getCookie } from 'typescript-cookie'
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userToken = getCookie("userToken");
  private authHeader = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": `bearer ${this.userToken}`
  });

  constructor(private http: HttpClient) { }

  getAllClientsAccounts(): Observable<any> {
    return this.http.get<Observable<any>>("http://localhost:8080/account/alluseraccounts", { headers: this.authHeader })
  }

}

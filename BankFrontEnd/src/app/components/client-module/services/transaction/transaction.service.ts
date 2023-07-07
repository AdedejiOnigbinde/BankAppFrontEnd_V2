import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getCookie } from 'typescript-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private userToken = getCookie("userToken");
  private authHeader = new HttpHeaders({
    "Content-Type": "application/json",
    "Authorization": `bearer ${this.userToken}`
  });

  constructor(private http: HttpClient) { }
  getAllRecentTransactions(): Observable<any> {
    return this.http.get<Observable<any>>("http://localhost:8080/transaction/accountrecenttransactions", { headers: this.authHeader })
  }
}

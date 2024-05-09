import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { accountDto } from '../../types';
@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAllClientsAccounts(): Observable<accountDto[]> {
    return this.http.get<accountDto[]>("account/client")
  }

  createAccount(accountType: string): Observable<string> {
    return this.http.post<string>("account/create", { "accountType": accountType });
  }

}

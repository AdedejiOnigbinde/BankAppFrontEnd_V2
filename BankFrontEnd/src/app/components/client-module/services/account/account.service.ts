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

}

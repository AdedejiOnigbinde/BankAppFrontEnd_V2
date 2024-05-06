import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { transactionDto } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  constructor(private http: HttpClient) { }
  getAllRecentTransactions(): Observable<transactionDto[]> {
    return this.http.get<transactionDto[]>("transaction/recent")
  }
}

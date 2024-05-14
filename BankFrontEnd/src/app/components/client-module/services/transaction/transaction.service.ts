import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { transactionDto, transferRequestDto } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  
  constructor(private http: HttpClient) { }
  getAllRecentTransactions(): Observable<transactionDto[]> {
    return this.http.get<transactionDto[]>("transaction/recent")
  }


  submitTransferRequest(transaction:transferRequestDto):Observable<string>{
    return this.http.post("transaction/outer-bank",transaction,{responseType: 'text'});
  }
}

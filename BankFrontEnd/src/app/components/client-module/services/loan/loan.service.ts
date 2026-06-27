import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loanDto, loanPaymentRequest, loanRequest } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class LoanService {

  constructor(private http: HttpClient) { }

  applyForLoan(payload: loanRequest): Observable<loanDto> {
    return this.http.post<loanDto>('client/loan', payload);
  }

  getAllLoans(): Observable<loanDto[]> {
    return this.http.get<loanDto[]>('client/loan');
  }

  getLoan(loanId: number): Observable<loanDto> {
    return this.http.get<loanDto>(`client/loan/${loanId}`);
  }

  getLoanSum(): Observable<number> {
    return this.http.get<number>('client/loan/sum');
  }

  payLoan(loanId: number, paymentAmount: number): Observable<string> {
    const payload: loanPaymentRequest = {
      loanId:        String(loanId),
      paymentAmount: String(paymentAmount)
    };
    return this.http.post('transaction/loan', payload, { responseType: 'text' });
  }
}

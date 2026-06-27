import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { billDto, paidBillDto, payBillRequest } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }

  getSavedBills(): Observable<billDto[]> {
    return this.http.get<billDto[]>('client/bill');
  }

  deleteBill(billId: number): Observable<void> {
    return this.http.delete<void>(`client/bill/${billId}`);
  }

  payBill(payload: payBillRequest): Observable<string> {
    return this.http.post('transaction/bill', payload, { responseType: 'text' });
  }

  getPaidBills(): Observable<paidBillDto[]> {
    return this.http.get<paidBillDto[]>('transaction/bill');
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  pageDto, clientDto, accountDto, depositRequestDto,
  adminLoanRequestDto, loanStatusUpdateRequest, depositStatusUpdateRequest
} from '../admin-types';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllClients(page = 0): Observable<pageDto<clientDto>> {
    return this.http.get<pageDto<clientDto>>(`client/all?page=${page}`);
  }

  getAllAccounts(page = 0): Observable<pageDto<accountDto>> {
    return this.http.get<pageDto<accountDto>>(`account/all?page=${page}`);
  }

  getPendingLoanRequests(): Observable<adminLoanRequestDto[]> {
    return this.http.get<adminLoanRequestDto[]>('client/loan/admin');
  }

  updateLoanStatus(loanId: number, changeStatus: 'approved' | 'rejected'): Observable<string> {
    const payload: loanStatusUpdateRequest = { loanId: String(loanId), changeStatus };
    return this.http.patch('client/loan/status', payload, { responseType: 'text' });
  }

  getAllDepositRequests(): Observable<depositRequestDto[]> {
    return this.http.get<depositRequestDto[]>('account/deposit/all');
  }

  processDeposit(depositRequestId: number, status: 'approved' | 'rejected'): Observable<string> {
    const payload: depositStatusUpdateRequest = { depositRequestId: String(depositRequestId), status };
    return this.http.patch('account/deposit', payload, { responseType: 'text' });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { depositRequestDto, depositRequestPayload } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  constructor(private http: HttpClient) { }

  getAllClientDepositRequest(): Observable<depositRequestDto[]> {
    return this.http.get<depositRequestDto[]>("account/deposit");
  }

  createDepositRequest(request: depositRequestPayload): Observable<string> {
    return this.http.post("account/deposit", request, { responseType: 'text' })
  }
}

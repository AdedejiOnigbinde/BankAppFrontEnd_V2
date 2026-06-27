import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { beneficiaryDto, changePasswordRequest, clientDto } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getTotalLoanSum(): Observable<number> {
    return this.http.get<number>('client/loan/sum');
  }

  getProfileData(): Observable<clientDto> {
    return this.http.get<clientDto>('client/profile');
  }

  updateProfile(payload: clientDto): Observable<clientDto> {
    return this.http.patch<clientDto>('client/profile', payload);
  }

  changePassword(payload: changePasswordRequest): Observable<string> {
    return this.http.patch('client/profile/password', payload, { responseType: 'text' });
  }

  deleteAccount(): Observable<void> {
    return this.http.delete<void>('client/remove');
  }

  getAllClientBeneficiares(): Observable<beneficiaryDto[]> {
    return this.http.get<beneficiaryDto[]>('client/beneficiary');
  }
}

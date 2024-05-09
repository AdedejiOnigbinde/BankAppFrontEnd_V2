import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { clientDto } from '../../types';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  getTotalLoanSum(): Observable<number> {
    return this.http.get<number>("client/loan/sum")
  }

  getProfileData(): Observable<clientDto>{
    return this.http.get<clientDto>("client/profile")
  }
}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthStateService } from './services/auth-state/auth-state.service';

@Injectable()
export class RequestInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private authState: AuthStateService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const modified = request.clone({
      url: environment.apiUrl + request.url,
      withCredentials: true   // browser sends HttpOnly JWT cookie automatically
    });

    return next.handle(modified).pipe(
      catchError((err) => {
        if (err.status === 401) {
          // Session expired or invalid — clear local state and redirect
          this.authState.clear();
          this.router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );
  }
}

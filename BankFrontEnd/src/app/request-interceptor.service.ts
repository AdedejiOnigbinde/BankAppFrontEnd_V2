import { HttpRequest, HttpHandler, HttpInterceptor, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { getCookie } from 'typescript-cookie';

export class RequestInterceptorService implements HttpInterceptor {
    private loginOrRegisterEndpoints: string[] = ['/login', '/register', '/register-admin'];
    private userToken = getCookie("userToken");

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isLoginOrRegisterRequest = this.loginOrRegisterEndpoints.some(endpoint => request.url.includes(endpoint));

        const modifiedRequest = request.clone({
            url: environment.apiUrl + request.url,
        });

        if (isLoginOrRegisterRequest) {
            return next.handle(modifiedRequest);
        }
        
        const requestWithAuthHeader = modifiedRequest.clone({
            setHeaders: {
                Authorization: `bearer ${this.userToken}` 
            }
        });

        return next.handle(requestWithAuthHeader);
    }
}
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators"
import {Router} from "@angular/router";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{
  constructor(private auth: AuthService, private router: Router) {
  }
//fügt jedem request einen token ein
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated()){
      req = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken()
        }
      })
    }
    return next.handle(req).pipe(
      catchError(
        (error: HttpResponse<any>) => this.handleAuthError(error)
      )
    )
  }
  private handleAuthError(error: HttpResponse<any>): Observable<any>{
    if(error.status === 401){
      this.router.navigate(['/login'], {
        queryParams: {
          sessionFailed: true
        }
      })
    }
    return throwError(error)
  }
}

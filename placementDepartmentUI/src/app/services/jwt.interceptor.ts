import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable  } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';


@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService,
    private router: Router,
    public snackBar: MatSnackBar) {}
    
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
    //   if (event instanceof HttpResponse) {
    //   }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
          switch (err.status) {
                case 401:
                  if(window.location.pathname != "/login" ){
                    localStorage.setItem('returnUrl',window.location.pathname);
                    this.router.navigate(['login']);
                  }
                  break;
                case 403:
                    this.auth.getPages();
                    this.router.navigate(['err403']);
                case 500 :
                    if(err.error.ExceptionType == "System.Data.Entity.Infrastructure.DbUpdateException" 
                    && err.error.ExceptionMessage == "547")
                    this.snackBar.open("לא ניתן למחוק את האובייקט", "סגור", {
                        duration: 8000,
                        direction:"rtl",
                        verticalPosition:'top',
                        panelClass:"err-msg"
                      })
                    else if(err.error.ExceptionType == "System.Exception" 
                    && err.error.ExceptionMessage == "Duplicate")
                      break;
                    else
                    this.snackBar.open("ארעה שגיאה בשרת", "סגור", {
                        duration: 8000,
                        direction:"rtl",
                        verticalPosition:'top',
                        panelClass:"err-msg"
                      })
                    break;
                default:
                    this.snackBar.open("ארעה שגיאה", "סגור", {
                        duration: 8000,
                        direction:"rtl",
                        verticalPosition:'top',
                        panelClass:"err-msg"
                      })
                    break;
            }
        }
    }));
  }
}
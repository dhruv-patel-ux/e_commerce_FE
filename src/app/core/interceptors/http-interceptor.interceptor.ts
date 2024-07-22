import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const httpInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
    const platform_id = inject(PLATFORM_ID);
    const router = inject(Router);

    if (isPlatformBrowser(platform_id)) {
        const token = localStorage.getItem('access_token');
        const updatedReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next(updatedReq).pipe(
            catchError((error: unknown) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401 || error.status === 403 ) {
                        localStorage.removeItem('access_token');
                        localStorage.removeItem('user');
                        router.navigate(['/login']);
                    }
                }
                return throwError(() => error);
            })
        );
    }

    return next(req);
};
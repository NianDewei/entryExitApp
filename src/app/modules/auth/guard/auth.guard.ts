import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private _authService: AuthService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._check();
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> {
    return this._check();
  }

  private _check(): Observable<boolean> {
    // Check the authentication status
    return this._authService.verifyIsAuth().pipe(
      switchMap((authenticated) => {
        // If the user is not authenticated...
        if (!authenticated) {
          // Redirect to the login page
          this._router.navigate(['/login']);

          // Prevent the access
          return of(false);
        }

        // Allow the access
        return of(true);
      })
    );
  }

  private _checkLoad(): Observable<boolean> {
    // Check the authentication status
    return this._authService.verifyIsAuth().pipe(
      tap((authenticated) => {
        if (!authenticated) {
          this._router.navigate(['/login']);
        }
      }),
      take(1)
    );
  }
}

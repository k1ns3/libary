import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import { getNpmData } from '../root-store/selectors/auth.selectors';
import { AppState } from '../root-store/root.store';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(
        private readonly _store: Store<AppState>,
        private readonly _router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this._store
            .select(getNpmData)
            .pipe(map(npmAuthData => this.handlingNpmAuthData(npmAuthData.npmAccessToken, npmAuthData.date, state.url)));
    }

    private handlingNpmAuthData(npmToken: string, npmTokenDate: number, returnUrl: string): boolean {
        if (npmToken && Date.now() < npmTokenDate) {
            return true;
        }

        this._router.navigate(['/login'], { queryParams: { returnUrl } });
        return false;
    }
}

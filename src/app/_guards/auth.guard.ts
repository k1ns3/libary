import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { getNpmToken, getNpmTokenDate } from '../root-store/selectors/auth.selectors';
import { AppState } from '../root-store/root.store';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    npmToken: string;
    npmTokenDate: number;
    constructor(
        private readonly _store: Store<AppState>,
        private readonly _router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this._store.select(getNpmToken).subscribe(data => this.npmToken = data);
        this._store.select(getNpmTokenDate).subscribe(data => this.npmTokenDate = data);

        if (this.npmToken && Date.now() < this.npmTokenDate) {
            return true;
        } else {
            this._router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }
}

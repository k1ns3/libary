import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LogOut } from '../root-store/actions/auth.actions';
import { AppState } from '../root-store/root.store';

@Component({
    selector: 'app-scout-library',
    templateUrl: './scout-library.component.html',
    styleUrls: ['./scout-library.component.scss']
})

export class ScoutLibraryComponent {

    constructor(private _store: Store<AppState>) { }

    logOut(): void {
        this._store.dispatch(new LogOut);
    }
}

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState, getAutoUpdateSettings, getCheckingForUpdate } from '../../../store';
import {
    CheckForUpdateNowAction,
    ToggleCheckForUpdateOnStartupAction,
    TogglePreReleaseFlagAction,
} from '../../../store/actions/auto-update-settings';
import { AutoUpdateSettings } from '../../../models/auto-update-settings';
import { getVersions } from '../../../util';

@Component({
    selector: 'settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss'],
    host: {
        class: 'container-fluid'
    }
})
export class SettingsComponent {
    version: string = getVersions().version;
    autoUpdateSettings$: Observable<AutoUpdateSettings>;
    checkingForUpdate$: Observable<boolean>;

    constructor(private store: Store<AppState>) {
        this.autoUpdateSettings$ = store.select(getAutoUpdateSettings);
        this.checkingForUpdate$ = store.select(getCheckingForUpdate);
    }

    toogleCheckForUpdateOnStartUp(value: boolean) {
        this.store.dispatch(new ToggleCheckForUpdateOnStartupAction(value));
    }

    toogleUsePreReleaseUpdate(value: boolean) {
        this.store.dispatch(new TogglePreReleaseFlagAction(value));
    }

    checkForUpdate() {
        this.store.dispatch(new CheckForUpdateNowAction());
    }
}

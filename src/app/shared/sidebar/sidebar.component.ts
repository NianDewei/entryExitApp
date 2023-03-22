import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent implements OnInit, OnDestroy {
  fullName: string = 'Loading...';
  fullNameSubs!: Subscription;

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this._store
      .select('auth')
      .subscribe(
        ({ user }) => (this.fullName = user?.displayName || 'Loading...')
      );
  }

  ngOnDestroy(): void {
    if (this.fullNameSubs) {
      this.fullNameSubs.unsubscribe();
    }
  }

  logout() {
    this._authService
      .signOutUser()
      .then(() => {
        this._router.navigate(['/login']);
      })
      .catch();
  }
}

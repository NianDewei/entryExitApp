import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { FormRegisterUser } from '../../interfaces/create-user.interface';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

// ngrx
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as ui from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm!: FormRegisterUser;
  uiSubscription!: Subscription;
  loading: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _store: Store<AppState>,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this._fb.nonNullable.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.uiSubscription = this._store
      .select('ui')
      .subscribe({ next: ({ isLoading }) => (this.loading = isLoading) });
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  register(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this._store.dispatch(ui.isLoading());

    this._authService
      .createUser(this.registerForm.getRawValue())
      .then((credential) => {
        this._store.dispatch(ui.stopLoading());
        this._router.navigate(['/']);
      })
      .catch((err) => {
        this._store.dispatch(ui.stopLoading());

        if (err.code != 'auth/email-already-in-use') {
          console.log('Hubo un error: ', err.code);
          return;
        }
        console.log('Este correo ya existe');
        this.registerForm.get('email')?.reset('');
      });
  }
}

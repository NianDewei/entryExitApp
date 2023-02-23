import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { FormLoginUser } from '../interfaces/credential-user.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent implements OnInit {
  loginForm!: FormLoginUser;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    Swal.fire({
      title: 'Accediendo...',
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this._authService
      .signInUser(this.loginForm.getRawValue())
      .then((user) => {
        Swal.close();
        this._router.navigate(['/']);
      })
      .catch((err) => {
        Swal.close();
        if (err.code != 'auth/user-not-found') {
          Swal.fire({
            icon: 'error',
            title: '',
            text: err.code,
          });
          return;
        }

        Swal.fire({
          icon: 'warning',
          title: 'Aviso',
          text: 'Correo y/o contraseña incorrecta.',
          confirmButtonColor: '#007bff',
        });
        this.loginForm.reset();
      });
  }
}

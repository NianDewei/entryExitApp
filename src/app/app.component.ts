import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private _authService: AuthService) {
    this._authService.initAuthListener();
  }

  ngOnInit(): void {}
}

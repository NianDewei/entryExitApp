import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styles: [],
  imports: [CommonModule, RouterModule, SharedModule],
})
export class DashboardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}

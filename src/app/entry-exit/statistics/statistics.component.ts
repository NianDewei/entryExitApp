import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './statistics.component.html',
  styles: [
  ]
})
export class StatisticsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

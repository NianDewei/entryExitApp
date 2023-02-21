import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.component.html',
  styles: [
  ]
})
export class DetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

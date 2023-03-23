import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Store } from '@ngrx/store';
import { AppState } from '../../../../app.reducer';
import { EntryExitModel } from '../../model/entry-exit.model';

import { Subscription } from 'rxjs';

// Charts
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { AppStateWithEntryExit } from '../../store/entry-exit.reducer';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './statistics.component.html',
  styles: [],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  entry: number = 0;
  exit: number = 0;

  totalEntry: number = 0;
  totalExit: number = 0;

  entryIsGreaterThanExit: boolean = false;
  entryIsLessThanExit: boolean = false;
  entryExitIsGreaterThanZero: boolean = false;

  difference: number = 0;

  itemsSubs!: Subscription;

  // Doughnut
  doughnutChartLabels: string[] = ['Exit', 'Entry'];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
  };

  constructor(private _store: Store<AppStateWithEntryExit>) {}

  ngOnInit(): void {
    this.itemsSubs = this._store.select('entryExit').subscribe(({ items }) => {
      this._generateStatistics(items);
    });
  }

  ngOnDestroy(): void {
    if (this.itemsSubs) {
      this.itemsSubs.unsubscribe();
      return;
    }
  }

  private _generateStatistics(items: Array<EntryExitModel>): void {
    this._resetValues();

    for (const item of items) {
      if (item.type === 'entry') {
        this.totalEntry += item.amount;
        this.entry++;
      } else {
        this.totalExit += item.amount;
        this.exit++;
      }
    }

    this._makeADifference();
    this.doughnutChartData.datasets = [
      { data: [this.totalExit, this.totalEntry] },
    ];
  }

  private _makeADifference(): void {
    this.entryIsGreaterThanExit = this.totalEntry - this.totalExit > 0;
    this.entryIsLessThanExit = this.totalEntry - this.totalExit < 0;
    this.entryExitIsGreaterThanZero = this.totalEntry > 0 || this.totalExit > 0;
    this.difference = this.totalEntry - this.totalExit;
  }

  private _resetValues() {
    const valueDefault: number = 0;

    this.totalEntry = valueDefault;
    this.totalExit = valueDefault;

    this.entry = valueDefault;
    this.exit = valueDefault;

    this.difference = valueDefault;
    this.doughnutChartData.datasets = [{ data: [] }];
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObservableDashboardComponent } from './observable-dashboard/observable-dashboard.component';
import { ObservableHQDashboardRoutingModule } from './observablehq-routing.module';
import { ObservableGraphComponent } from './observable-graph/observable-graph.component';
import { ObservableSample1Component } from './observable-sample1/observable-sample1.component';
import { ObservableSample2Component } from './observable-sample2/observable-sample2.component';
import { ObservableSample3Component } from './observable-sample3/observable-sample3.component';
import { ObservableSample4Component } from './observable-sample4/observable-sample4.component';
import { ObservableHQBarchartComponent } from './barchart/barchart.component';

@NgModule({
  imports: [
    CommonModule,
    ObservableHQDashboardRoutingModule
  ],
  declarations: [
    ObservableDashboardComponent,
    ObservableSample1Component,
    ObservableSample2Component,
    ObservableSample3Component,
    ObservableSample4Component,
    ObservableHQBarchartComponent,
    ObservableGraphComponent,
  ]
})
export class ObservableHQModule { }

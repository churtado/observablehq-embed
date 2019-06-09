import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { D3DashboardRoutingModule } from './d3dashboard-routing.module';
import { LinechartComponent } from './line-chart/line-chart.component';
import { HeatGridComponent } from './heat-grid/heat-grid.component';
import { ScatterplotComponent } from './scatterplot/scatterplot.component';

@NgModule({
  imports: [
    CommonModule,
    D3DashboardRoutingModule,
  ],
  declarations: [DashboardRootComponent, BarChartComponent, LinechartComponent, HeatGridComponent, ScatterplotComponent]
})
export class D3DashboardModule { }

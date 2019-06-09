import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardRootComponent } from './dashboard-root/dashboard-root.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

const routes: Routes = [
    {
        path: 'd3',
        component: DashboardRootComponent,
        // canActivate: [IsAuthenticatedGuard, UserHasPermissionGuard],
        // data: { permission: 'Manage Users' }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class D3DashboardRoutingModule { }
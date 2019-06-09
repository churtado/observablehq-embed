import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObservableDashboardComponent } from './observable-dashboard/observable-dashboard.component';
import { ObservableSample1Component } from './observable-sample1/observable-sample1.component';
import { ObservableSample2Component } from './observable-sample2/observable-sample2.component';
import { ObservableSample3Component } from './observable-sample3/observable-sample3.component';
import { ObservableSample4Component } from './observable-sample4/observable-sample4.component';
import { ObservableHQBarchartComponent } from './barchart/barchart.component';

const routes: Routes = [
  {
    path: "forcegraph",
    component: ObservableDashboardComponent,
    // canActivate: [IsAuthenticatedGuard, UserHasPermissionGuard],
    // data: { permission: 'Manage Users' }
  },
  {
    path: "dashboard",
    component: ObservableDashboardComponent,
    // canActivate: [IsAuthenticatedGuard, UserHasPermissionGuard],
    // data: { permission: 'Manage Users' }
  },
  {
    path: "sample1",
    component: ObservableSample1Component,
    // canActivate: [IsAuthenticatedGuard, UserHasPermissionGuard],
    // data: { permission: 'Manage Users' }
  },
  {
    path: "sample2",
    component: ObservableSample2Component,
    // canActivate: [IsAuthenticatedGuard, UserHasPermissionGuard],
    // data: { permission: 'Manage Users' }
  },
  {
    path: "sample3",
    component: ObservableSample3Component,
    // canActivate: [IsAuthenticatedGuard, UserHasPermissionGuard],
    // data: { permission: 'Manage Users' }
  },
  {
    path: "sample4",
    component: ObservableSample4Component,
    // canActivate: [IsAuthenticatedGuard, UserHasPermissionGuard],
    // data: { permission: 'Manage Users' }
  },
  {
    path: "barchart",
    component: ObservableHQBarchartComponent,
    // canActivate: [IsAuthenticatedGuard, UserHasPermissionGuard],
    // data: { permission: 'Manage Users' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObservableHQDashboardRoutingModule { }
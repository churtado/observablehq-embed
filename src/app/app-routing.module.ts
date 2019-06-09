import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/observablehq/barchart',
        pathMatch: 'full'
    },
    {
        path: 'd3dashboard',
        loadChildren: './d3-dashboard/d3-dashboard.module#D3DashboardModule'
    },
    {
        path: 'observablehq',
        loadChildren: './observablehq/observablehq.module#ObservableHQModule'
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

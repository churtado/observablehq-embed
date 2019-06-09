import { Component, OnInit } from '@angular/core';
import { DataModel } from '../d3-dashboard.models';

@Component({
  selector: 'app-dashboard-root',
  templateUrl: './dashboard-root.component.html',
  styleUrls: ['./dashboard-root.component.css']
})
export class DashboardRootComponent implements OnInit {

  barChartData: DataModel[] = [
    {
      label: "a",
      value: 2
    },
    {
      label: "b",
      value: 4
    },
    {
      label: "c",
      value: 5
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}

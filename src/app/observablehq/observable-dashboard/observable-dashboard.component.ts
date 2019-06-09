import { Runtime, Inspector } from "@observablehq/runtime";
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import notebook from '../../../assets/observable/dashboard1';

@Component({
  selector: 'app-observable-dashboard',
  templateUrl: './observable-dashboard.component.html',
  styleUrls: ['./observable-dashboard.component.css']
})
export class ObservableDashboardComponent implements OnInit, AfterContentInit {

  title = 'ng-d3-dashboard';
  @ViewChild('dashboard') directedGraph: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    Runtime.load(notebook, Inspector.into(this.directedGraph.nativeElement));
  }

}

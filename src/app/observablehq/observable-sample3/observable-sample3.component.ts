import { Runtime, Inspector } from "@observablehq/runtime";
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import notebook from '../../../assets/observable/dashboard4';

@Component({
  selector: 'app-observable-sample3',
  templateUrl: './observable-sample3.component.html',
  styleUrls: ['./observable-sample3.component.css']
})
export class ObservableSample3Component implements OnInit, AfterContentInit {

  title = 'ng-d3-sample3';
  @ViewChild('dashboard') directedGraph: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    Runtime.load(notebook, Inspector.into(this.directedGraph.nativeElement));
  }

}

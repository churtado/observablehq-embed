import { Runtime, Inspector } from "@observablehq/runtime";
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import notebook from '../../../assets/observable/dashboard2';

@Component({
  selector: 'app-observable-sample1',
  templateUrl: './observable-sample1.component.html',
  styleUrls: ['./observable-sample1.component.css']
})
export class ObservableSample1Component implements OnInit, AfterContentInit {

  title = 'ng-d3-sample1';
  @ViewChild('dashboard') directedGraph: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    Runtime.load(notebook, Inspector.into(this.directedGraph.nativeElement));
  }

}

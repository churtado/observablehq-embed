import { Runtime, Inspector } from "@observablehq/runtime";
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import notebook from '../../../assets/observable/responsive';

@Component({
  selector: 'app-observable-sample4',
  templateUrl: './observable-sample4.component.html',
  styleUrls: ['./observable-sample4.component.css']
})
export class ObservableSample4Component implements OnInit, AfterContentInit {

  title = 'ng-d3-sample3';
  @ViewChild('dashboard') directedGraph: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    Runtime.load(notebook, Inspector.into(this.directedGraph.nativeElement));
  }

}

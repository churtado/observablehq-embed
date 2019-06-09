import { Runtime, Inspector } from "@observablehq/runtime";
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import notebook from '../../../assets/observable/dashboard3';

@Component({
  selector: 'app-observable-sample2',
  templateUrl: './observable-sample2.component.html',
  styleUrls: ['./observable-sample2.component.css']
})
export class ObservableSample2Component implements OnInit, AfterContentInit {

  title = 'ng-d3-sample2';
  @ViewChild('dashboard') directedGraph: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    Runtime.load(notebook, Inspector.into(this.directedGraph.nativeElement));
  }

}

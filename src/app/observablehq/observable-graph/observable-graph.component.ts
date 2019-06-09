import { Runtime, Inspector } from "@observablehq/runtime";
import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import notebook from '../../../assets/observable/graph';

@Component({
  selector: 'app-observable-graph',
  templateUrl: './observable-graph.component.html',
  styleUrls: ['./observable-graph.component.css']
})
export class ObservableGraphComponent implements OnInit, AfterContentInit {

  title = 'ng-d3-force-directed-graph';
  @ViewChild('directedGraph') directedGraph: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    Runtime.load(notebook, Inspector.into(this.directedGraph.nativeElement));
  }

}

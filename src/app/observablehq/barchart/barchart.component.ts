import { Runtime, Inspector } from "@observablehq/runtime";
import { Component, OnInit, AfterContentInit } from '@angular/core';
import notebook from '../../../assets/observable/barchart';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class ObservableHQBarchartComponent implements OnInit, AfterContentInit {

  // http://localhost:4200/observablehq/barchart

  title = 'observable embedded';
  
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {

    new Runtime().module(notebook, name => {
      switch (name) {
        case "yearBarChart": return new Inspector(document.querySelector("#yearBarChart"));
        case "localAuthorityBarChart": return new Inspector(document.querySelector("#localAuthorityBarChart"));
        case "localAuthorityMapChart": return new Inspector(document.querySelector("#localAuthorityMapChart"));
        case "setupDataStructure": return new Inspector(document.querySelector("#setupDataStructure"));
      }
    })

  }

}

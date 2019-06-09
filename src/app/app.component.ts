import { Component, OnInit, Inject, ViewContainerRef, ViewChild, ElementRef, AfterViewInit } from "@angular/core";
import { Router, NavigationStart, RoutesRecognized, NavigationEnd } from '@angular/router';
import { Observable } from "rxjs/Rx";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router,
    private vRef: ViewContainerRef
  ) {
  }

  ngOnInit() {
  }

}


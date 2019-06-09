import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableGraphComponent } from './observable-graph.component';

describe('ObservableGraphComponent', () => {
  let component: ObservableGraphComponent;
  let fixture: ComponentFixture<ObservableGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObservableGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

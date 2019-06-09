import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeatGridComponent } from './heat-grid.component';

describe('HeatGridComponent', () => {
  let component: HeatGridComponent;
  let fixture: ComponentFixture<HeatGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeatGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeatGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

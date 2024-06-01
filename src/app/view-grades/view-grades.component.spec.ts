import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGradesComponent } from './view-grades.component';

describe('ViewGradesComponent', () => {
  let component: ViewGradesComponent;
  let fixture: ComponentFixture<ViewGradesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewGradesComponent]
    });
    fixture = TestBed.createComponent(ViewGradesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

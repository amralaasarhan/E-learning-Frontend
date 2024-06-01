import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllAssessmentsComponent } from './view-all-assessments.component';

describe('ViewAllAssessmentsComponent', () => {
  let component: ViewAllAssessmentsComponent;
  let fixture: ComponentFixture<ViewAllAssessmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAllAssessmentsComponent]
    });
    fixture = TestBed.createComponent(ViewAllAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

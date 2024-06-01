import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackAnalysisComponent } from './feedback-analysis.component';

describe('FeedbackAnalysisComponent', () => {
  let component: FeedbackAnalysisComponent;
  let fixture: ComponentFixture<FeedbackAnalysisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FeedbackAnalysisComponent]
    });
    fixture = TestBed.createComponent(FeedbackAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

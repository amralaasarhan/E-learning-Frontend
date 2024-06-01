import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAssessmentQuestionsComponent } from './show-assessment-questions.component';

describe('ShowAssessmentQuestionsComponent', () => {
  let component: ShowAssessmentQuestionsComponent;
  let fixture: ComponentFixture<ShowAssessmentQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowAssessmentQuestionsComponent]
    });
    fixture = TestBed.createComponent(ShowAssessmentQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

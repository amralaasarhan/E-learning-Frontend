import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssessmentFormComponent } from './create-assessment-form.component';

describe('CreateAssessmentFormComponent', () => {
  let component: CreateAssessmentFormComponent;
  let fixture: ComponentFixture<CreateAssessmentFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateAssessmentFormComponent]
    });
    fixture = TestBed.createComponent(CreateAssessmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

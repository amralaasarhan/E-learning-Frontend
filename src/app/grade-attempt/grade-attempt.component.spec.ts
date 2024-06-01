import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeAttemptComponent } from './grade-attempt.component';

describe('GradeAttemptComponent', () => {
  let component: GradeAttemptComponent;
  let fixture: ComponentFixture<GradeAttemptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradeAttemptComponent]
    });
    fixture = TestBed.createComponent(GradeAttemptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

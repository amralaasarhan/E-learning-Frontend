import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProgressComponent } from './student-progress.component';

describe('StudentProgressComponent', () => {
  let component: StudentProgressComponent;
  let fixture: ComponentFixture<StudentProgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentProgressComponent]
    });
    fixture = TestBed.createComponent(StudentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

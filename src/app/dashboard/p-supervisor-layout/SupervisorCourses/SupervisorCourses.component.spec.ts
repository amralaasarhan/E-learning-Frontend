import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorCoursesComponent } from './SupervisorCourses.component';

describe('SupervisorCoursesComponent', () => {
  let component: SupervisorCoursesComponent;
  let fixture: ComponentFixture<SupervisorCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisorCoursesComponent]
    });
    fixture = TestBed.createComponent(SupervisorCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

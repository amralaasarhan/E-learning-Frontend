import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCoursesComponent } from './allCourses.component';
describe('AllCoursesComponent', () => {
  let component: AllCoursesComponent;
  let fixture: ComponentFixture<AllCoursesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCoursesComponent]
    });
    fixture = TestBed.createComponent(AllCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';


import { InstructorLayoutComponent } from './instructor-layout.component';
describe('InstructorLayoutComponent', () => {
  let component: InstructorLayoutComponent;
  let fixture: ComponentFixture<InstructorLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstructorLayoutComponent]
    });
    fixture = TestBed.createComponent(InstructorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

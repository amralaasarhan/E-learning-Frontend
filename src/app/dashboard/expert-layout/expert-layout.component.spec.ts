import { ComponentFixture, TestBed } from '@angular/core/testing';


import { ExpertLayoutComponent } from './expert-layout.component';
describe('ExpertLayoutComponent', () => {
  let component: ExpertLayoutComponent;
  let fixture: ComponentFixture<ExpertLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertLayoutComponent]
    });
    fixture = TestBed.createComponent(ExpertLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

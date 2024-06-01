import { ComponentFixture, TestBed } from '@angular/core/testing';


import { CompanyRepresentativeLayoutComponent } from './companyRepresentative-layout.component';
describe('InstructorLayoutComponent', () => {
  let component: CompanyRepresentativeLayoutComponent;
  let fixture: ComponentFixture<CompanyRepresentativeLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompanyRepresentativeLayoutComponent]
    });
    fixture = TestBed.createComponent(CompanyRepresentativeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

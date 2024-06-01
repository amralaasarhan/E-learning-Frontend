import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioUpdateComponent } from './update-portfolio.component';

describe('UpdatePortfolioComponent', () => {
  let component: PortfolioUpdateComponent;
  let fixture: ComponentFixture<PortfolioUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioUpdateComponent]
    });
    fixture = TestBed.createComponent(PortfolioUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

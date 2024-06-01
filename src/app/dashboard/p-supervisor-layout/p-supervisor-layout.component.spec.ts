import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PSupervisorLayoutComponent } from './p-supervisor-layout.component';

describe('PSupervisorLayoutComponent', () => {
  let component: PSupervisorLayoutComponent;
  let fixture: ComponentFixture<PSupervisorLayoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PSupervisorLayoutComponent]
    });
    fixture = TestBed.createComponent(PSupervisorLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

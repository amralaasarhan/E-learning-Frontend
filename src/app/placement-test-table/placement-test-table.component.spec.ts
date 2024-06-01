import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacementTestTableComponent } from './placement-test-table.component';

describe('PlacementTestTableComponent', () => {
  let component: PlacementTestTableComponent;
  let fixture: ComponentFixture<PlacementTestTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlacementTestTableComponent]
    });
    fixture = TestBed.createComponent(PlacementTestTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

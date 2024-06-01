import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisteredTracksComponent } from './registered-tracks.component';

describe('RegisteredTracksComponent', () => {
  let component: RegisteredTracksComponent;
  let fixture: ComponentFixture<RegisteredTracksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisteredTracksComponent]
    });
    fixture = TestBed.createComponent(RegisteredTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

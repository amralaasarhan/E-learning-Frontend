import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorTracksComponent } from './supervisorTracks.component';

describe('SupervisorTracksComponent', () => {
  let component: SupervisorTracksComponent;
  let fixture: ComponentFixture<SupervisorTracksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupervisorTracksComponent]
    });
    fixture = TestBed.createComponent(SupervisorTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

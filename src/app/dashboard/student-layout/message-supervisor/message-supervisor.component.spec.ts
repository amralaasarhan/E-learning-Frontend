import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageSupervisorComponent } from './message-supervisor.component';

describe('MessageSupervisorComponent', () => {
  let component: MessageSupervisorComponent;
  let fixture: ComponentFixture<MessageSupervisorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageSupervisorComponent]
    });
    fixture = TestBed.createComponent(MessageSupervisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

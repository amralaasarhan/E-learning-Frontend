import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageExpertComponent } from './message-expert.component';

describe('MessageExpertComponent', () => {
  let component: MessageExpertComponent;
  let fixture: ComponentFixture<MessageExpertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageExpertComponent]
    });
    fixture = TestBed.createComponent(MessageExpertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

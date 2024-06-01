import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionsFromQbComponent } from './add-questions-from-qb.component';

describe('AddQuestionsFromQbComponent', () => {
  let component: AddQuestionsFromQbComponent;
  let fixture: ComponentFixture<AddQuestionsFromQbComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionsFromQbComponent]
    });
    fixture = TestBed.createComponent(AddQuestionsFromQbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

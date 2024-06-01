import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { SurveyFeedbackComponent } from './survey-feedback.component';

@NgModule({
  declarations: [
    SurveyFeedbackComponent
  ],
  imports: [
    CommonModule, // Import CommonModule
    FormsModule // Import FormsModule
  ],
  exports: [
    SurveyFeedbackComponent
  ]
})
export class SurveyFeedbackModule { }

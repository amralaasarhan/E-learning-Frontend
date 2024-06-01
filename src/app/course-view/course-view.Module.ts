import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { CourseViewComponent } from './course-view.component';

@NgModule({
  declarations: [
    CourseViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule // Add FormsModule to imports array
  ],
  exports: [
    CourseViewComponent
  ]
})
export class CourseViewModule { }

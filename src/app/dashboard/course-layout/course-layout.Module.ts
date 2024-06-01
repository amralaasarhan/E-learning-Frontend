import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { CourseLayoutComponent } from './course-layout.component';

@NgModule({
  declarations: [
    CourseLayoutComponent
  ],
  imports: [
    CommonModule,
    FormsModule // Add FormsModule to imports array
  ],
  exports: [
    CourseLayoutComponent
  ]
})
export class CourseLayoutModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { TrackViewComponent } from './track-view.component';

@NgModule({
  declarations: [
    TrackViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule // Add FormsModule to imports array
  ],
  exports: [
    TrackViewComponent
  ]
})
export class TrackViewModule { }

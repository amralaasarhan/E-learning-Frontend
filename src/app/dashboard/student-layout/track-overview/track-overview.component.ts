import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TrackService } from '../../../track/track.service'; // Adjust the path based on your folder structure
import { CourseServices } from '../../../course/course.service'; // Adjust the path based on your folder structure
import { Track } from '../../../track/track'
import { Course } from '../../../course/course'

@Component({
  selector: 'app-track-overview',
  templateUrl: './track-overview.component.html',
  styleUrls: ['./track-overview.component.css']
})
export class TrackOverviewComponent {
  trackId: number = 0;
  track: Track | null = null; 
  courses: Course[] = [];
  selectedCourses: number[] = [];

  constructor(
    private route: ActivatedRoute,
    private trackService: TrackService,
    private courseServices: CourseServices
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.trackId = +params['trackId'];
      if (this.trackId) {
        this.getTrackDetails(this.trackId);
        console.log("Track = ", this.track)
        this.getCoursesInTrack(this.trackId);
      }
    });
  }

  getTrackDetails(trackId: number): void {
    this.trackService.getTrackById(trackId)
      .subscribe(track => {
        this.track = track ?? null
        console.log("Track = ", this.track); // Move logging inside the subscription callback

      });
  }

  getCoursesInTrack(trackId: number): void {
    this.courseServices.getCoursesInTrack(trackId)
      .subscribe(courses => {
        this.courses = courses;
      });
  }
  onRadioChange(event: any, courseId: number): void {
    if (event.target.value === 'yes' && !this.selectedCourses.includes(courseId)) {
      this.selectedCourses.push(courseId);
    } else if (event.target.value === 'no' && this.selectedCourses.includes(courseId)) {
      const index = this.selectedCourses.indexOf(courseId);
      this.selectedCourses.splice(index, 1);
    }
  }
  
  enrollNow(): void {
    console.log('Enrolling in courses:', this.selectedCourses);
    // Perform further actions, such as sending the selected course IDs to the server for enrollment
  }

}

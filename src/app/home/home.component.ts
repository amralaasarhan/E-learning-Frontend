import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TrackService } from '../track/track.service';
import { CourseServices } from '../course/course.service';
import { Track } from '../track/track';
import { Course } from '../course/course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  courses: Course[] = [];
  tracks: Track[] = [];
  displayedTracks: Track[] = []; // Tracks to display initially
  showAllTracks: boolean = false; // Flag to indicate whether to show all tracks
  displayedCourses: Course[] = []; // Courses to display initially
  showAllCourses: boolean = false; // Flag to indicate whether to show all courses

  constructor(private router: Router, private tracksService: TrackService, private courseService: CourseServices) { }

  navigateToLogin() {
    this.router.navigate(['/signup']);
  }

  ngOnInit(): void {
    this.getAllTracks();
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.courseService.getAllCourses()
      .subscribe(courses => {
        this.courses = courses;
        this.updateDisplayedCourses();
      });
  }

  getAllTracks(): void {
    this.tracksService.getAllTracks()
      .subscribe(tracks => {
        this.tracks = tracks;
        console.log(this.tracks);
        this.updateDisplayedTracks();
      });
  }

  toggleTracksDisplay(): void {
    this.showAllTracks = !this.showAllTracks;
    this.updateDisplayedTracks();
  }

  toggleCoursesDisplay(): void {
    this.showAllCourses = !this.showAllCourses;
    this.updateDisplayedCourses();
  }

  updateDisplayedTracks(): void {
    if (this.showAllTracks) {
      this.displayedTracks = this.tracks;
    } else {
      // Show only a subset of tracks (e.g., first 3)
      this.displayedTracks = this.tracks.slice(0, 3);
    }
  }

  updateDisplayedCourses(): void {
    if (this.showAllCourses) {
      this.displayedCourses = this.courses;
    } else {
      // Show only a subset of courses (e.g., first 3)
      this.displayedCourses = this.courses.slice(0, 3);
    }
  }
}

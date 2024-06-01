import { Component } from '@angular/core';
import { TrackService } from '../track/track.service';
import { Course } from '../course/course';
import { Track } from '../track/track';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-track-registration',
  templateUrl: './track-registration.component.html',
  styleUrls: ['./track-registration.component.css']
})
export class TrackRegistrationComponent {
  trackId!: number;
  track: Track | undefined;
  courses: Course[] = []; // Initialize as an empty array
  selectedCourses: number[] = [];
  notSelectedCourses: number[] = [];
  constructor(private trackService: TrackService, private route: ActivatedRoute, private http: HttpClient , private router:Router) {
    this.trackId = this.route.snapshot.params['trackId'];

    this.loadCourses();
  }

  loadCourses() {
    this.trackService.getTrackById(16).subscribe(track => {
      this.track = track;
      if (this.track) {
        this.courses = this.track!.courses || [];
        this.notSelectedCourses = this.courses.map(course => course.courseId);
        console.log(this.courses)
        console.log(this.track)
      }
    });
  }
  onCourseSelected(courseId: number) {
    const index = this.selectedCourses.indexOf(courseId);
    if (index === -1) {
      this.selectedCourses.push(courseId);
      this.notSelectedCourses = this.notSelectedCourses.filter(id => id !== courseId);
    } else {
      this.selectedCourses.splice(index, 1);
      this.notSelectedCourses.push(courseId);
    }
  }

  skipPlacementTest() {
    this.http.get<any>(`http://localhost:3000/project/student/skip-placement-test/${this.trackId}`)
      .subscribe(response => {
        console.log(response); // Log the response from the API
        alert("Placement Test Skipped, You've successfully registered in this track")
      }, error => {
        console.error(error); // Log any errors
        alert("Failed Track Registration, You're already registered")
      });
  }

  takePlacementTest() {
    // Send selected and not selected courses to the backend API
    this.http.post<any>(`http://localhost:3000/project/student/register-placement-tests/${this.trackId}`, {
      selectedCourses: this.selectedCourses,
      notSelectedCourses: this.notSelectedCourses
    }).subscribe(response => {
      console.log(response);
      alert("Placement Tests Registered Successfully!");
      this.router.navigate([`placement-tests/${this.trackId}`]);
    }, error => {
      console.error(error);
      // Handle error or display an error message to the user
    });
  }
}
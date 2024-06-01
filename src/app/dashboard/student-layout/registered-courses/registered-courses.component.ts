import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CourseServices} from '../../../course/course.service';
import { Course } from '../../../course/course';

@Component({
  selector: 'app-registered-courses',
  templateUrl: './registered-courses.component.html',
  styleUrls: ['./registered-courses.component.css']
})
export class RegisteredCoursesComponent implements OnInit{

  courses: Course[] = [];
  user: any;

  constructor(private http: HttpClient, private router: Router, private courseService: CourseServices) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        console.log(userData);
        this.user = userData[1] || userData.email;
        this.getRegisteredCourses();
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.error('User data not found in local storage');
    }
  }

  getRegisteredCourses(): void {
    this.courseService.getRegisteredCourses()
      .subscribe(courses => this.courses = courses);
  }

}

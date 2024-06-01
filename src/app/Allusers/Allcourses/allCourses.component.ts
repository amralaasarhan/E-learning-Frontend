import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseServices } from '../../course/course.service';
import { Course } from '../../course/course';

@Component({
  selector: 'app-course',
  templateUrl: './allCourses.component.html',
  styleUrls: ['./allCourses.component.css']
})
export class AllCoursesComponent implements OnInit {

  courses: Course[] = [];

  constructor(private router: Router, private courseService: CourseServices) { }

  navigateToLogin() {
    this.router.navigate(['/signup']);
  }

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    this.courseService.getAllCourses()
      .subscribe(courses => this.courses = courses);
  }
}

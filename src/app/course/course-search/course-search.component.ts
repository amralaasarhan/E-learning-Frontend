import { Component, OnInit } from '@angular/core';
import { Course } from '../course'; // Import the Course interface
import { CourseServices } from '../course.service'; // Import the CourseServices service

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.css']
})
export class CourseSearchComponent implements OnInit {
  searchQuery: string = ''; // Variable to store the search query
  courses: Course[] = []; // Array to store search results

  constructor(private courseService: CourseServices) { }

  ngOnInit(): void {
    // Optionally, you can load initial data or perform any initialization here
  }

    searchCourses(): void {
      if (this.searchQuery.trim()) {
        // Call the service method to search for courses
        this.courseService.searchCoursesByName(this.searchQuery).subscribe(courses => {
          this.courses = courses;
          console.log(this.courses);
        });
      }
    }
}

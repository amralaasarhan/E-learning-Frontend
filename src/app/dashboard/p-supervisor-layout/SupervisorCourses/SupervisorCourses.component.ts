import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseServices} from '../../../course/course.service';
import { Course } from '../../../course/course';
import { Track } from 'src/app/track/track';
import { TrackService } from 'src/app/track/track.service';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-SupervisorCourses',
  templateUrl: './SupervisorCourses.component.html',
  styleUrls: ['./SupervisorCoursescomponent.css']
})
export class SupervisorCoursesComponent implements OnInit {

  courses: Course[] = [];
  user: any
  constructor(private router: Router, private userService: UserService, private courseService: CourseServices , private trackService: TrackService,) { }

  ngOnInit(): void {
    this.loadUserData();
    this.getAllCoursesOfSupervisor();

  }

  loadUserData(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        console.log(userData);
        this.user = userData[5] || userData.fName;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.error('User data not found in local storage');
    }
  }
  
  getAllCoursesOfSupervisor(): void {
    this.courseService.getAllCoursesOfSupervisor()
      .subscribe(courses => this.courses = courses);
  }


  navigateToCourseView(courseId: number) {
    this.router.navigate(['/course', courseId]);
  }

 
  
}
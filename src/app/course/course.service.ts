import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../Auth/auth-service.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Course } from './course';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CourseServices {

  private getAllCoursesPath = 'http://localhost:3000/project/supervisor/getExistingCourses';
  private getAllCoursesHomePath = 'http://localhost:3000/project/getCourses';
  private getAllCoursesOfSupervisorPath = 'http://localhost:3000/project/supervisor/viewCourses';
  private getRegisteredCoursesPath = 'http://localhost:3000/project/student/registeredCourses';
  private searchCoursePath = 'http://localhost:3000/project';
  private addcourseTopicPath = 'http://localhost:3000/project/supervisor/addCourseTopic';
  private deletecourseTopicPath = 'http://localhost:3000/project/supervisor/deleteCourseTopic';

  constructor(private http: HttpClient,
    private authService: AuthServiceService) { }

    getCourseByName(courseName: string): Observable<Course | undefined> {
      return this.getAllCourses().pipe(
        tap(courses => console.log('All courses:', courses)), // Log all courses
        map(courses => {
          const foundCourse = courses.find(course => course.courseName === courseName);
          console.log('Course found by name:', foundCourse);
          return foundCourse;
        })
      );
    }

    getCourseById(courseId: number | string): Observable<Course | undefined> {
      const parsedCourseId = typeof courseId === 'string' ? parseInt(courseId, 10) : courseId;
      console.log('this course id', parsedCourseId);
      return this.getAllCourses().pipe(
        tap(courses => console.log('All by id:', courses)), // Log all courses
        map(courses => {
          const foundCourse = courses.find(course => course.courseId === parsedCourseId);
          console.log('Type of courseId:', typeof parsedCourseId);
          console.log('Type of course.id:', typeof foundCourse?.courseId);
          console.log('Course found by id:', foundCourse);
          return foundCourse;
        })
      );
    }


  getAllCourses(): Observable<Course[]> {
    return this.http.get<any>(this.getAllCoursesHomePath).pipe(
      map(response => {
        if (response && response.courses && Array.isArray(response.courses)) {
         return response.courses.map((courseData: any) => {
        // Check if trackImage data is provided
        const courseImageCheck = courseData.courseImage ? `data:image/jpeg;base64,${courseData.courseImage}` : null;

        return {
          courseId: courseData.courseId,
          courseName: courseData.courseName,
          courseLevel: courseData.courseLevel,
          courseHours: courseData.courseHours,
          courseImage: courseImageCheck || null // Set courseImage to null if it's not provided
        } as Course;
      });
        } else {
          console.error('Invalid response structure:', response);
          return [];
        }
      })
    );
  }

  mapCoursesResponse(response: any): Course[] {
    if (response && response.courses && Array.isArray(response.courses)) {
      return response.courses.map((courseData: any) => {
        const courseImageCheck = courseData.courseImage ? `data:image/jpeg;base64,${courseData.courseImage}` : null;
  
        return {
          courseId: courseData.courseId,
          courseName: courseData.courseName,
          courseLevel: courseData.courseLevel,
          courseHours: courseData.courseHours,
          courseImage: courseImageCheck || null // Set courseImage to null if it's not provided
        } as Course;
      });
    } else {
      console.error('Invalid response structure:', response);
      return [];
    }
  }
  

  
  getRegisteredCourses(): Observable<Course[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.get<any>(this.getRegisteredCoursesPath, { headers }).pipe(
      map(response => {
        if (response && response.courses && Array.isArray(response.courses)) {
          return response.courses.map((courseData: any) => {
            const courseImageCheck = courseData.courseImage ? `data:image/jpeg;base64,${courseData.courseImage}` : null;
      
            return {
              courseId: courseData.courseId,
              courseName: courseData.courseName,
              courseLevel: courseData.courseLevel,
              courseHours: courseData.courseHours,
              courseImage: courseImageCheck || null // Set courseImage to null if it's not provided
            } as Course;
          });
        } else {
          console.error('Invalid response structure:', response);
          return [];
        }
      })
    );
  }

  getAllCoursesOfSupervisor(): Observable<Course[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.get<any>(this.getAllCoursesOfSupervisorPath, { headers }).pipe(
      map(response => {
        if (response && response.courses && Array.isArray(response.courses)) {
          return response.courses.map((courseData: any) => {
            const courseImageCheck = courseData.courseImage ? `data:image/jpeg;base64,${courseData.courseImage}` : null;
      
            return {
              courseId: courseData.courseId,
              courseName: courseData.courseName,
              courseLevel: courseData.courseLevel,
              courseHours: courseData.courseHours,
              courseImage: courseImageCheck || null // Set courseImage to null if it's not provided
            } as Course;
          });
        } else {
          console.error('Invalid response structure:', response);
          return [];
        }
      })
    );
  }

  getCoursesInTrack(trackId: number): Observable<Course[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const getTrackPath = `http://localhost:3000/project/supervisor/viewCoursesInTrack/${trackId}`;
  
    return this.http.get<any>(getTrackPath, { headers }).pipe(
      tap(response => console.log('Raw Response:', response)), // Log the raw response
      map(response => {
        // Map the response using mapCoursesResponse function
        return this.mapCoursesResponse(response);
      })
    );
  }
  

  searchCoursesByName(query: string): Observable<Course[]> {
    return this.http.get<any>(`${this.searchCoursePath}/searchCourse?query=${query}`).pipe(
      map(response => {
        return this.mapCoursesResponse(response);
      }),
      catchError(error => {
        console.error('Error searching courses by name:', error);
        return throwError('Error searching courses by name. Please try again later.');
      })
    );
  }

  addCourseTopic(topicName: string, courseId: number): Observable<any> {
    const body = { topicName, courseId };
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post(this.addcourseTopicPath, body, { headers }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error adding course topic:', error);
        return throwError('Error adding course topic');
      })
    );
  }


  deleteCourseTopic(courseId: number): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.delete(this.deletecourseTopicPath, { headers, body: { courseId } }).pipe(
      map(response => response),
      catchError(error => {
        console.error('Error deleting course topic:', error);
        return throwError('Error deleting course topic');
      })
    );
  }

}

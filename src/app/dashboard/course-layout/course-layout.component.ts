import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CourseServices } from '../../course/course.service';
import { Course } from '../../course/course';

import { CourseIlo } from 'src/app/course/course-ilo';
import { CourseTopic } from '../../course/course-topic'
import { AuthServiceService } from '../../Auth/auth-service.service';
import { UserService } from 'src/app/user/user.service';
import { Track } from 'src/app/track/track';
import { TrackIlo } from 'src/app/track/track-ilo';

import { TrackIloWithWeight } from 'src/app/track/track-ilo';
import { TrackService } from 'src/app/track/track.service';

import { AssessmentService } from 'src/app/Assessment/assessment.service';
import { IAddAssessmentResponse } from 'src/app/Assessment/iadd-assessment-response';

@Component({
  selector: 'app-course-layout',
  templateUrl: './course-layout.component.html',
  styleUrls: ['./course-layout.component.css']
})
export class CourseLayoutComponent implements OnInit {
  trackIlosWithWeight: TrackIloWithWeight[] = [];
  user: any;
  title: string = '';
  description: string = '';
  track: Track | null = null;
  errorMessage: string = '';
  showPopup: boolean = false;
  showPopupEditCourse: boolean = false;
  showPopupDeleteCourse: boolean = false;
  showPopupAddCourse: boolean = false;
  showPopupAddCourseILo: boolean = false;
  showPopupEditCourseILo: boolean = false;
  showPopupDeleteCourseILo: boolean = false;
  showPopupViewCourseILODetails: boolean = false;
  showPopupViewCourseTopicDetails: boolean = false;
  showPopupViewCourseDetails: boolean = false;
  showPopupAddCourseTopic: boolean = false;
  showPopupLinkCourseToTrackILO: boolean = false;
  showPopupViewWeightCourseToTrackILO: boolean = false;
  showPopupAddAssessment: boolean = false;


  assesmentType: string;
  courseIloId: number;
  courseNameToDelete: string = ''; // Updated variable name
  courseNameToUpdate: string = ''; // Updated variable name
  newcourseName: string = '';
  newcourseLevel: string = '';
  newCourseHours: number = 0;
  weight: any = null;
  updatedCourseTitle: string = ''; // Updated variable name
  courseName: string;
  courseLevel: string;
  courseHours: number;
  trackId: number;
  course: any = null;
  courseId: number;
  imageData: File | null = null;
  fileName: string = '';

  courseFile: File | null = null;
  courseFileName: string = '';
  trackILOIdsForCourses: any[] | null = null;
  courseTopic: CourseTopic = { courseTopicId: 0, courseIloId: 0, courseId: 0, topicName: '', file: '' };
  trackIlos: TrackIlo[] = [];
  selectedTrackIloIndex: number | null = null;
  trackIlo: TrackIlo = { trackIloId: 0, trackOutcome: '', trackType: '', trackId: 0, trackDescription: '' };
  courseIlos: CourseIlo[] = [];
  courseTopics: CourseTopic[] = [];
  selectedCourseIloIndex: number | null = null;
  selectedCourseTopicIndex: number | null = null;
  weights: any[] | null = null;
  courseIlo: CourseIlo = { courseIloId: 0, courseOutcome: '', courseIloDescription: '', courseType: '', courseId: 0,weight:0 };

  constructor(private route: ActivatedRoute, private router: Router, private assessmentService: AssessmentService, private trackService: TrackService, private userService: UserService, private courseService: CourseServices, private authService: AuthServiceService, private http: HttpClient) {
    this.courseName = '';
    this.courseLevel = '';
    this.courseHours = 0;
    this.assesmentType = '';
    this.courseIloId = 0;
    this.trackId = 0;
    this.courseId = 0;
  }

  ngOnInit(): void {
    this.loadUserData();
    this.route.params.subscribe(params => {
      console.log('Route Params:', params);
      this.courseName = params['courseName'];
      const trackId = +params['trackId'];
      this.trackId = trackId;
      this.getTrackDetails(this.trackId);
      if (this.courseName) {
        this.getCourseDetails(this.courseName)


      } else {
        console.error('Course ID is null or undefined');
      }
    });
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



  getCourseDetails(courseName: string): void {
    this.courseService.getCourseByName(courseName)
      .subscribe(course => {
        if (course) {
          this.course = course;
          this.courseId = course.courseId
          this.courseName = course.courseName;
          this.courseLevel = course.courseLevel;
          this.courseHours = course.courseHours;
          console.log("Course Id **:", this.courseId)
          this.getCourseIlo(this.courseId);
          this.getCourseTopics(this.courseId);
          this.getTrackILOForThisCourse(this.courseId);
        } else {
          console.error('Course data not found');
        }
      });
  }


  openPopupEditCourse(): void { // Updated method name
    this.showPopupEditCourse = true;
  }

  closePopupEditCourse(): void { // Updated method name
    if (this.course) {
      if (this.newcourseName) {
        this.course.courseName = this.newcourseName;
      } else {
        this.course.courseName = this.course.courseName;
      }
    } else {
      console.error('Course is null, cannot update title');
    }
    this.showPopupEditCourse = false;
  }

  openPopupDeleteCourse(): void { // Updated method name
    this.showPopupDeleteCourse = true;
  }

  closePopupDeleteCourse(): void {
    this.showPopupDeleteCourse = false;
    this.router.navigate(['./courseLayout', this.trackId, this.course.courseName]);
  }


  getCurrentCourseIlo(): CourseIlo | null {
    if (this.selectedCourseIloIndex !== null && this.courseIlos.length > this.selectedCourseIloIndex) {
      console.log(",v,rpfefe,fedf", this.courseIlos[this.selectedCourseIloIndex])
      return this.courseIlos[this.selectedCourseIloIndex];
    }
    return null;
  }


  openPopupViewWeightCourseToTrackILO(): void {
    this.showPopupViewWeightCourseToTrackILO = true;
  }

  closePopupViewWeightCourseToTrackILO(): void {
    this.showPopupViewWeightCourseToTrackILO = false;
  }


  openPopUpAddCourseILo(): void {
    this.showPopupAddCourseILo = true;
  }

  closePopupAddCourseILo(): void {
    this.showPopupAddCourseILo = false;
  }

  openPopUpEditCourseILo(): void {
    this.showPopupEditCourseILo = true;
  }

  closePopupEditCourseILo(): void {
    this.showPopupEditCourseILo = false;
  }


  openPopUpDeleteCourseILo(): void {
    this.showPopupDeleteCourseILo = true;
  }

  closePopupDeleteCourseILo(): void {
    this.showPopupDeleteCourseILo = false;
  }


  openPopUpViewCourseDetails(): void {
    this.showPopupViewCourseDetails = true;
  }

  closePopUpViewCourseDetails(): void {
    this.showPopupViewCourseDetails = false;
  }

  openPopUpViewCourseILODetails(): void {
    this.showPopupViewCourseILODetails = true;
  }

  closePopUpViewCourseILODetails(): void {
    this.showPopupViewCourseILODetails = false;
  }


  addCourseILO(): void {
    const bodyData = {

      courseOutcome: this.courseIlo.courseOutcome,
      courseType: this.courseIlo.courseType,
      courseIloDescription: this.courseIlo.courseIloDescription,
      courseId: this.courseId
    };
    console.log("body data", bodyData)
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this.http.post<any>('http://localhost:3000/project/supervisor/addCourseIlo', bodyData, { headers }).subscribe(
        (response: any) => {
          // Update user data after adding the track
          console.log('Course ILO Added successfully:', response);
          this.user = response.user;
          // Store updated user data in local storage
          localStorage.setItem('user', JSON.stringify(this.user));
          this.closePopupAddCourseILo
          console.log('Course ILO Added successfully:', response);
        },
        (error) => {
          console.error('Error adding Course:', error);
          this.errorMessage = 'An error occurred while adding Course';
        }
      );
    } else {
      console.error('No authentication token available');
    }
  }

  updateCourseILO() {
    console.log("function called")
    const updateData = {
      updateData: {
        COURSE_OUTCOME: this.courseIlo?.courseOutcome,
        COURSE_TYPE: this.courseIlo?.courseType,
        COURSE_ID_FK: this.courseId
      }
    };

    const courseId = this.courseIlo?.courseId;
    const token = this.authService.getToken();
    console.log('Token:', token);
    if (token) {
      const headers = new HttpHeaders({ 'authorization': `Bearer ${token}` });
      console.log('Request Headers:', headers);
      this.http.put<any>(`http://localhost:3000/project/supervisor/updateCourseIlo/${courseId}`, updateData, { headers })
        .subscribe(
          (response: any) => {
            this.closePopupEditCourseILo()
            console.log('Course ILO updated successfully:', response);
          },
          (error) => {
            console.error('Error updating Course ILO:', error);
          }
        );
    } else {
      console.error('No authentication token available');
    }
  }


  deleteCourseIlo() {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    const courseId = this.courseIlo.courseId;
    this.http.delete<any>(`http://localhost:3000/project/supervisor/deleteCourseIlo/${courseId}`, { headers }).subscribe(
      (response: any) => {
        const token = response.token;
        const user = this.userService.getUser();
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.closePopupDeleteCourseILo()
        console.log('Course ILO deleted successfully:', response);
      },
      (error) => {
        console.error('Error deleting course:', error);
        this.errorMessage = 'An error occurred while deleting course';
      }
    );

  }

  getCourseIlo(courseId: number): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

      this.http.get<any>(`http://localhost:3000/project/supervisor/getCourseIlo/${courseId}`, { headers })
        .subscribe(
          (response: any) => {
            if (response.status === 'OK' && response.courseIloDetails) {
              console.log('Course ILO details received:', response.courseIloDetails);
              this.courseIlos = response.courseIloDetails.map((courseIloDetails: any) => ({
                courseIloId: courseIloDetails.courseIloId,
                courseOutcome: courseIloDetails.courseOutcome,
                courseType: courseIloDetails.courseType,
                trackId: courseId,
                courseIloDescription: courseIloDetails.courseIloDescription
              }));
              console.log('Course ILOs after fetching from backend:', this.courseIlos); // Log the courseIlos array here
            } else {
              console.error('Track ILO details not found');
            }
          },
          (error) => {
            console.error('Error fetching Course ILO:', error);
          }
        );
    }
  }

  getCourseTopics(courseId: number): void {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.get<any>(`http://localhost:3000/project/supervisor/getCourseTopics/${courseId}`, { headers }).subscribe((response: any) => {
      if (response.status === 'OK' && response.courseTopicsDetails) {
        console.log('Course Topics details received:', response.courseTopicsDetails);

        this.courseTopics = response.courseTopicsDetails.map((courseTopicsDetails: any) => {

          if (courseTopicsDetails.files && courseTopicsDetails.files.length > 0) {
            const firstFile = courseTopicsDetails.files;
            // Construct the base64 data URI
            const fileCheck = `data:/pdf;base64,${firstFile}`;
            // Update the 'file' property
            courseTopicsDetails.file = [fileCheck];
          } else {

            courseTopicsDetails.file = [];
          }


          return {
            courseTopicId: courseTopicsDetails.courseTopicId,
            topicName: courseTopicsDetails.topicName,
            courseIloId: courseTopicsDetails.courseIloId,
            courseId: courseTopicsDetails.courseId,
            file: courseTopicsDetails.file
          };
        });
        console.log('Course Topics after fetching from backend:', this.courseTopics);
      } else {
        console.error('Course Topics details not found');
      }
    },
      (error) => {
        console.error('Error fetching Course Topics', error);
      }
    );

  }

  onSelectCourseIlo(): void {
  }

  openPopupLinkCourseToTrackILO(): void { // Updated method name
    this.showPopupLinkCourseToTrackILO = true;
  }

  closePopupLinkCourseToTrackILO(): void {
    this.showPopupLinkCourseToTrackILO = false;
  }


  getCurrentTrackIlo(): TrackIlo | null {
    if (this.selectedTrackIloIndex !== null && this.trackIlos.length > this.selectedTrackIloIndex) {
      return this.trackIlos[this.selectedTrackIloIndex];
    }
    return null;
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.imageData = files[0]; // Assign the selected file to imageData
      if (this.imageData) {
        this.fileName = this.imageData.name; // Store the name of the selected file
      }
    }
  }
  updateCourse() {
    const updateData = {
      C_NAME: this.newcourseName,
      COURSE_LEVEL: this.newcourseLevel,
      COURSE_HOURS: this.newCourseHours

    };

    const formData = new FormData();
    formData.append('updateData', JSON.stringify(updateData)); // Append update data
    if (this.imageData) {
      formData.append('courseImage', this.imageData); // Append image data
    }

    const token = this.authService.getToken();
    console.log('Token:', token);
    if (token) {
      const headers = new HttpHeaders({ 'authorization': `Bearer ${token}` });
      console.log('Request Headers:', headers);

      const courseName = this.course.courseName
      console.log(courseName)
      this.http.put<any>(`http://localhost:3000/project/supervisor/editCourse/${courseName}`, formData, { headers })
        .subscribe(
          (response: any) => {
            if (response.status === 'OK') {
              const token = response.token;
              const user = this.userService.getUser();
              console.log("user", user);
              localStorage.setItem('token', token);
              localStorage.setItem('user', JSON.stringify(user));

              this.closePopupEditCourse(); // Close the edit course popup
            } else {
              this.errorMessage = response.message || 'Invalid update';
            }
          },
          (error) => {
            console.error('Error updating course:', error);
            this.errorMessage = 'An error occurred while updating course';
          }
        );

    } else {
      console.error('No authentication token available');
    }
  }


  deleteCourse() {
    const token = this.authService.getToken();
    if (token && this.course) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const courseId = this.course.id; // Assuming 'id' is the property representing the course ID
      if (courseId) {
        this.http.delete<any>(`http://localhost:3000/project/supervisor/deleteCourse/${courseId}`, { headers }).subscribe(
          (response: any) => {
            if (response.status === 'OK') {
              const token = response.token;
              this.closePopupDeleteCourse()
              const user = this.userService.getUser();
              localStorage.setItem('token', token);
              localStorage.setItem('user', JSON.stringify(user));
            } else {
              this.errorMessage = response.message || 'Invalid login';
            }
          },
          (error) => {
            console.error('Error deleting course:', error);
            this.errorMessage = 'An error occurred while deleting course';
          }
        );
      } else {
        console.error('Course ID is null, cannot delete course');
      }
    } else {
      console.error('No authentication token available or course is null');
    }
  }


  openCourseDetails(): void {
    console.log(this.courseId)
    this.router.navigate(['./courseDetails', this.trackId, this.course.id]);
  }



  openPopupAddCourseTopic(): void {
    this.showPopupAddCourseTopic = true;
  }

  closePopupAddCourseTopic(): void {
    this.showPopupAddCourseTopic = false;
  }

  onCourseFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.courseFile = files[0]; // Assign the selected file to imageData
      if (this.courseFile) {
        this.courseFileName = this.courseFile.name; // Store the name of the selected file
      }
    }
  }
  addCourseTopic(courseIloTd: number): void {
    const formData = new FormData();
    formData.append('topicName', this.courseTopic.topicName);
    formData.append('courseId', this.courseId.toString());
    formData.append('courseIloTd', courseIloTd.toString());
    if (this.courseFile) {
      formData.append('courseFile', this.courseFile);
    }

    this.http.post<any>('http://localhost:3000/project/supervisor/addCourseTopic', formData).subscribe(
      response => {
        console.log('Course topic added successfully:', response);
        // Handle success, e.g., show a success message or navigate to another page
        this.getCourseTopics(this.courseId);
        this.closePopupAddCourseTopic();
      },
      error => {
        console.error('Error adding course topic:', error);
        // Handle error, e.g., show an error message
      }
    );
  }


  linkCourseToTrackILO(trackIloId: any): void {
    console.log('trackIloId:', trackIloId);
    console.log('courseId:', this.courseId);
    const requestBody = {
      trackIloId: trackIloId,
      courseId: this.courseId,
    };


    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found in localStorage');
      return;
    }

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.post<any>('http://localhost:3000/project/supervisor/linkCourseToTrackILO', requestBody, { headers }).subscribe(
      response => {
        console.log('Response after adding course:', response);

        this.closePopupLinkCourseToTrackILO();
      },
      error => {
        console.error('Error adding course to track:', error);
      }
    );
  }
  getTrackILOForThisCourse(courseId: number): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

      this.http.get<any>(`http://localhost:3000/project/supervisor/getTrackILOForThisCourse/${courseId}`, { headers })
        .subscribe(
          (response: any) => {
            if (response.status === 'OK' && response.weightArray) {
              const weightArray = response.weightArray;
              console.log('Weight Array:', weightArray);

              const courseIds: number[] = [];
              const weights: number[] = [];
              const trackOutcomes: String[] = []
              weightArray.forEach((item: any) => {
                courseIds.push(item.courseId);
                trackOutcomes.push(item.trackIloOutcome);
                weights.push(item.weight);
              });

              console.log('Weights:', weights); // Log weights array
this.trackILOIdsForCourses=trackOutcomes;
              this.weights = weights;
            } else {
              console.error('Track ILO details not found or weightArray is missing');
            }
          },
          (error) => {
            console.error('Error fetching Track ILO:', error);
          }
        );
    } else {
      console.error('No authentication token available');
    }
  }




  getTrackDetails(trackId: number): void {
    this.trackService.getTrackById(trackId)
      .subscribe(track => {
        if (track) {
          this.track = track;
          console.log('Track Details:', this.track);
          console.log(track.trackId)
          this.trackIlo.trackId = track.trackId
          console.log('Track Details:', this.track);
          this.getTrackIlo(this.trackIlo.trackId);
          console.log("Track ilo", this.trackIlo.trackOutcome)
        } else {
          console.error('Track data not found');
        }
      });
  }

  getTrackIlo(trackId: number): void {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

      this.http.get<any>(`http://localhost:3000/project/supervisor/getTrackIlo/${trackId}`, { headers })
        .subscribe(
          (response: any) => {
            if (response.status === 'OK' && response.trackIloDetails) {
              this.trackIlos = response.trackIloDetails.map((trackIloDetails: any) => ({
                trackIloId: trackIloDetails.trackIloId,
                trackOutcome: trackIloDetails.trackOutcome,
                trackType: trackIloDetails.trackType,
                trackId: trackId,
                trackDescription: trackIloDetails.trackDescription
              }));
              console.log('Track ILOs:', this.trackIlos);
            } else {
              console.error('Track ILO details not found');
            }
          },
          (error) => {
            console.error('Error fetching Track ILO:', error);
          }
        );
    } else {
      console.error('No authentication token available');
    }
  }

  onSelectTrackIlo(): void {
    // Handle changes in the selected track ILO here if needed
  }
  onSelectCourseTopics(): void {
    // Handle changes in the selected track ILO here if needed
  }

  openPopupAddAssessment(): void {
    this.showPopupAddAssessment = true;
  }

  closePopupAddAssessment(): void {
    this.showPopupAddAssessment = false;
  }
  //  this.router.navigate(['/add-questions', assessmentId]); // Adjust the route as necessary

  addAssessment(courseIloTd: number): void {
    if (typeof this.assesmentType !== 'string' || this.assesmentType.trim() === '') {
      console.error('Assessment type must be a non-empty string');
      return; // Prevent sending the request
    }

    // Validate courseIloId
    if (typeof courseIloTd !== 'number' || isNaN(courseIloTd)) {
      console.error('Course ILO ID must be a number');
      return; // Prevent sending the request
    }

    this.assessmentService.addAssessment(this.assesmentType, courseIloTd).subscribe(
      response => {
        console.log('Response:', response);
        // const assesmentId = response.assesmentId;
        this.router.navigate(['/assessment-details', { type: this.assesmentType }]);
      },
      error => {
        console.error('Error adding assessment:', error);
        // Handle error, e.g., show an error message
      }
    );
    this.closePopupAddAssessment();
  }

  

}


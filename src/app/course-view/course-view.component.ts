import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CourseServices } from '../course/course.service';
import { Course } from '../course/course';

import { CourseIlo } from 'src/app/course/course-ilo';
import { CourseTopic } from '../course/course-topic'
import { AuthServiceService } from '../Auth/auth-service.service';
import { UserService } from 'src/app/user/user.service';
import { Track } from 'src/app/track/track';
import { TrackIlo } from 'src/app/track/track-ilo';

import { TrackIloWithWeight } from 'src/app/track/track-ilo';
import { TrackService } from 'src/app/track/track.service';

import { AssessmentService } from 'src/app/Assessment/assessment.service';
import { IAddAssessmentResponse } from 'src/app/Assessment/iadd-assessment-response';
import { DemoAssessment } from '../Assessments/assessmentModel';

@Component({
  selector: 'app-course-view',
  templateUrl: './course-view.component.html',
  styleUrls: ['./course-view.component.css']
})
export class CourseViewComponent implements OnInit {

  trackIlosWithWeight: TrackIloWithWeight[] = [];
  //user data
  userData: any;

  //course data
  courseId!: number
  course: Course = { courseId: 0, courseName: "", courseHours: 0, courseLevel: '', courseImage: '' };

  //Track Data
  track: Track = { trackId: 0, title: '', trackImage: '', description: '', courses: [], supervisorFk: 0 }


  //TrackIlo Data
  trackIlos: TrackIlo[] = [];
  selectedTrackIloIndex: number | null = null;


  //Link Course To trackilo
  showLinkCourseToTrackILOPopup: boolean = false;


  showPopupEditCourseTopic: boolean = false;
  showPopupDeleteCourseTopic: boolean = false;


  showPopupEditCourse: boolean = false;
  showPopupDeleteCourse: boolean = false;
  showPopupAddCourse: boolean = false;
  showPopupAddCourseILo: boolean = false;
  showPopupEditCourseILo: boolean = false;
  showPopupDeleteCourseILo: boolean = false;
  showPopupViewCourseTopicDetails: boolean = false;
  showPopupViewCourseDetails: boolean = false;
  showPopupAddCourseTopic: boolean = false;
  showPopupViewWeightCourseToTrackILO: boolean = false;
  showPopupAddAssessment: boolean = false;
  showPopupViewCourseILODetails: boolean = false;
  showAddCourseILOWeightPopup: boolean = false;
  //courseTopics
  courseTopics: CourseTopic[] = [];
  /////////////////////
  courseIloWeight: number | null = null;

  assesmentType: string;
  courseIloId: number;
  courseNameToDelete: string = ''; // Updated variable name
  courseNameToUpdate: string = ''; // Updated variable name
  newcourseName: string = '';
  newcourseLevel: string = '';
  newTopicName: string = '';
  newCourseHours: number = 0;
  courseTopicId: number = 0;
  weight: any = null;
  updatedCourseTitle: string = ''; // Updated variable name
  courseName: string;
  courseLevel: string;
  courseHours: number;
  trackId: number;
  imageData: File | null = null;
  fileName: string = '';
  errorMessage: string = '';
  courseFile: File | null = null;
  courseFileName: string = '';
  trackILOIdsForCourses: any[] | null = null;
  courseTopic: CourseTopic = { courseTopicId: 0, courseIloId: 0, courseId: 0, topicName: '', file: '' };
  trackIlo: TrackIlo = { trackIloId: 0, trackOutcome: '', trackType: '', trackId: 0, trackDescription: '' };
  courseIlos: CourseIlo[] = [];
  selectedCourseIloIndex: number | null = null;
  selectedCourseTopicIndex: number | null = null;
  weights: any[] | null = null;
  courseIlo: CourseIlo = { courseIloId: 0, courseOutcome: '', courseIloDescription: '', courseType: '', courseId: 0 ,weight:0};


  surveyID!: number
  participants!: any
  supervisor!: { supervisorID: number, supervisorFname: String, supervisorLname: String }
  students!: {
    studentID: number
    studentFname: String,
    studentLname: String
  }[]

  assessments: DemoAssessment[] = []
  quizzes: DemoAssessment[] = []
  assignmentsOnline: DemoAssessment[] = []
  assignmentsSubmission: any[] = []
  projects: any[] = []
  teachingAssessment!: DemoAssessment 
  submissionAssessments: any[] = []


  ///inst survey 
  instructorID!:number 
  instructorSurveyID!:number

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService,
    private http: HttpClient,
    private courseService: CourseServices,
    private trackService: TrackService,
    private assessmentService: AssessmentService,

  ) {

    this.courseName = '';
    this.courseLevel = '';
    this.courseHours = 0;
    this.assesmentType = '';
    this.courseIloId = 0;
    this.trackId = 0;
    this.courseId = 0;
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData(); // Get user data when the component initializes
    this.courseId = this.route.snapshot.params['courseID'];
    this.trackId = this.route.snapshot.params['trackId'];
    this.getTrackDetails(this.trackId);
    this.getCourseDetails(this.courseId);
    this.getCourseIlo(this.courseId)
    this.getCourseTopics(this.courseId);
    this.getInstructorID().then(() => {
      this.getInstructorSurveyID();
    });


    this.getSurveyID();
    this.getParticipants();
    this.getAssessmentsForCourse(this.courseId);
  }

  navigateToViewSubmissions(courseTopicId: number) {
    this.router.navigate(['/viewSubmissions', courseTopicId]);
  }

  navigateToViewGrades() {
    this.router.navigate(['/view-grades', this.courseId]);
  }
  navigateToCreateAssessment() {
    this.router.navigate(['/create-Assessment', this.courseId]);
  }
  navigateToUnGradedAssessemt() {
    this.router.navigate(['/ungraded-attempts', this.courseId]);
  }
  navigateToAssessment(assesmentId:number) {
    this.router.navigate(['/submitAssessment', assesmentId]);
  }

  navigateToContactSupervisor() {
    this.router.navigate(['/message-supervisor', this.supervisor.supervisorID]);
  }
  navigateToTeachingAssessment()
  {
    this.router.navigate(['/submitAssessment', this.teachingAssessment.assessmentID])
  }
  blockApplyForTeaching(): boolean {
    return this.instructorID !== null && this.instructorID !== undefined;
  }
  navigateToFeedbackAnalysis(): void { 
    this.router.navigate(['/feedback-results', this.surveyID])

  }
  navigateToInstructorFeedbackAnalysis() :void { 
    this.router.navigate(['/feedback-results', this.instructorSurveyID])

  }
  createSurvey(): void {
    // Define the survey data to send in the request body
    const surveyData = {
      courseID: this.courseId, // Assuming courseId is not provided in this example
      trackID: this.trackId
    };

    // Make an HTTP POST request to the API endpoint
    this.http.post<any>('http://localhost:3000/project/supervisor/createSurvey', surveyData)
      .subscribe(
        response => {
          // Check the status code of the response
          if (response && response.message === 'Survey Added') {
            alert('Survey added successfully');
            this.router.navigate(['/createSurvey', response.surveyID]);

          } else {
            alert('Failed to add survey');
            // Handle unexpected response, if needed
          }
        },
        error => {
          console.error('Error adding survey:', error);
          // Handle error, if needed
        }
      );
  }
  navigateToSurvey() {
    this.router.navigate(['/submitSurvey', this.surveyID]);
  }
  navigateToInstructorSurvey() {
    console.log("inst survey zobry" , this.instructorSurveyID)
    this.router.navigate(['/submitSurvey', this.instructorSurveyID]);
  }
  getCourseDetails(courseId: number): void {
    this.courseService.getCourseById(courseId)
      .subscribe(course => {
        if (course) {
          this.course = course;
          this.courseId = course.courseId
          this.getCourseIlo(this.courseId)
          this.getTrackILOForThisCourse(this.courseId)
        } else {
          console.error('Course data not found');
        }
      });
  }

  getTrackDetails(trackId: number): void {
    this.trackService.getTrackById(trackId)
      .subscribe(track => {
        if (track) {
          this.track = track;
          this.getTrackIlo(this.track.trackId);

        } else {
          console.error('Track data not found');
        }
      });
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

  openLinkCourseToTrackILOPopup(): void {
    this.showLinkCourseToTrackILOPopup = true;
  }

  closeLinkCourseToTrackILOPopup(): void {
    this.showLinkCourseToTrackILOPopup = false;
  }


  openPopUpAddCourseILo(): void {
    this.showPopupAddCourseILo = true;
  }

  closePopupAddCourseILo(): void {
    this.showPopupAddCourseILo = false;
  }

  openPopUpEditCourseILo(): void {
    this.getCourseIlo(this.courseId);
    this.showPopupEditCourseILo = true;
  }

  closePopupEditCourseILo(): void {
    this.showPopupEditCourseILo = false;
  }

  openPopUpEditCourseTopic(courseTopicId: number): void {
    this.showPopupEditCourseTopic = true;
    this.courseTopicId = courseTopicId;
  }

  closePopupEditCourseTopic(): void {
    this.showPopupEditCourseTopic = false;
  }

  openPopUpDeleteCourseTopic(courseTopicId: number): void {
    this.showPopupDeleteCourseTopic = true;
    this.courseTopicId = courseTopicId;
  }

  closePopUpDeleteCourseTopic(): void {
    this.showPopupDeleteCourseTopic = false;
  }



  openPopUpDeleteCourseILo(): void {
    this.getCourseIlo(this.courseId);
    this.showPopupDeleteCourseILo = true;
  }

  closePopupDeleteCourseILo(): void {
    this.showPopupDeleteCourseILo = false;
  }

  openPopUpAddCourseILOWeight(): void {
    this.showAddCourseILOWeightPopup = true;
  }

  closePopUpAddCourseILOWeight(): void {
    this.showAddCourseILOWeightPopup = false;
  }


  openPopUpViewCourseDetails(): void {
    this.showPopupViewCourseDetails = true;
  }

  closePopUpViewCourseDetails(): void {
    this.showPopupViewCourseDetails = false;
  }

  openPopUpViewCourseILODetails(): void {
    this.getCourseIlo(this.courseId);
    this.showPopupViewCourseILODetails = true;
  }

  closePopUpViewCourseILODetails(): void {
    this.showPopupViewCourseILODetails = false;
  }

  deleteCourseTopic(): void {
    const token = this.authService.getToken();
    if (token && this.courseTopicId) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const courseTopicId = this.courseTopicId; // Assuming 'id' is the property representing the course ID
      if (courseTopicId) {
        this.http.delete<any>(`http://localhost:3000/project/supervisor/deleteCourseTopic/${courseTopicId}`, { headers }).subscribe(
          (response: any) => {
            if (response.status === 'ok') {
              console.log("Course Deleted Successfully")
              this.getCourseTopics(this.courseId)

              this.closePopUpDeleteCourseTopic()

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

  onSelectTrackIlo(): void {
    // Handle changes in the selected track ILO here if needed
  }
  onSelectCourseTopics(): void {
    // Handle changes in the selected track ILO here if needed
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




  openPopupViewWeightCourseToTrackILO(): void {
    this.showPopupViewWeightCourseToTrackILO = true;
  }

  closePopupViewWeightCourseToTrackILO(): void {
    this.showPopupViewWeightCourseToTrackILO = false;
  }

  openPopupAddCourseTopic(): void {
    this.showPopupAddCourseTopic = true;
  }

  closePopupAddCourseTopic(): void {
    this.courseTopic = { courseTopicId: 0, courseIloId: 0, courseId: 0, topicName: '', file: '' };
    this.courseFile = null;
    this.courseFileName = '';

    this.showPopupAddCourseTopic = false;
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
          this.closePopupAddCourseILo()
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
        COURSE_OUTCOME: this.courseIlo.courseOutcome,
        COURSE_TYPE: this.courseIlo.courseType,
        COURSE_ILO_DESCRIPTION: this.courseIlo.courseIloDescription,
        COURSE_ID_FK: this.courseId,
        WEIGHT:this.courseIlo.weight,
      }
    };
    const currentCourseIlo = this.getCurrentCourseIlo();
    if (currentCourseIlo) {
      const courseIloId = currentCourseIlo.courseIloId;

      const token = this.authService.getToken();
      console.log('Token:', token);
      if (token) {
        const headers = new HttpHeaders({ 'authorization': `Bearer ${token}` });
        console.log('Request Headers:', headers);
        this.http.put<any>(`http://localhost:3000/project/supervisor/updateCourseIlo/${courseIloId}`, updateData, { headers })
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
    } else {
      console.error('No Course ILO selected or invalid index');
    }
  }


  deleteCourseIlo() {
    const currentCourseIlo = this.getCurrentCourseIlo();
    if (currentCourseIlo) {
      const courseIloId = currentCourseIlo.courseIloId;
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders({ 'authorization': `Bearer ${token}` });
        console.log('Request Headers:', headers);
        this.http.delete<any>(`http://localhost:3000/project/supervisor/deleteCourseIlo/${courseIloId}`, { headers }).subscribe(
          (response: any) => {
            if (response.status === "ok") {
              console.log('Course ILO deleted successfully:', response);
              this.closePopupDeleteCourseILo()
              this.getCourseIlo(this.courseId);
            }

          },
          (error) => {
            console.error('Error deleting Course ILO:', error);
            // Optionally, display an error message or perform other error handling
          }
        );
      } else {
        console.error('No authentication token available');
        // Optionally, redirect to login page or display an error message
      }
    } else {
      console.error('No Course ILO selected or invalid index');
    }
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
              this.trackILOIdsForCourses = trackOutcomes;
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
      (response: any) => {
        if (response.status === 'OK') {
          console.log('Response after adding course:', response);

          this.closeLinkCourseToTrackILOPopup();
        } else {
          console.error('Track ILO details not found or weightArray is missing');
        }
      },
      (error) => {
        console.error('Error adding course to track:', error);
      }
    );
  }

  updateCourseTopic(): void {
    const updateData = {
      TOPIC_NAME: this.newTopicName
    };

    const formData = new FormData();
    formData.append('updateData', JSON.stringify(updateData)); // Append update data

    if (this.courseFile) {
      formData.append('courseFile', this.courseFile);
    }

    // Log request headers
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'authorization': `Bearer ${token}` });
    console.log('Request headers:', headers);



    // Continue with HTTP request
    this.http.put<any>(`http://localhost:3000/project/supervisor/updateCourseTopic/${this.courseTopicId}`, formData, { headers })
      .subscribe(
        (response: any) => {
          if (response.status === 'ok') {
            console.log("Course Updated Successfully")
            this.closePopupEditCourse();
            this.getCourseDetails(this.courseId)
          } else {
            // Handle error
          }
        },
        (error) => {
          console.error('Error updating Course topic:', error);
          // Handle error
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
                courseIloDescription: courseIloDetails.courseIloDescription,
                weight:courseIloDetails.weight
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


  onSelectCourseIlo(): void {
    console.log('selectedCourseIloIndex:', this.selectedCourseIloIndex);
    console.log('courseIlos:', this.courseIlos);
    this.getCurrentCourseIlo();
  }



  getCurrentCourseIlo(): CourseIlo | null {
    if (this.selectedCourseIloIndex !== null && this.courseIlos.length > this.selectedCourseIloIndex) {
      console.log("get of the current course ilo is : ", this.courseIlos[this.selectedCourseIloIndex])
      return this.courseIlos[this.selectedCourseIloIndex];
    }
    return null;
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



  updateCourse(): void {
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


    const courseName = this.course.courseName
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'authorization': `Bearer ${token}` });
    this.http.put<any>(`http://localhost:3000/project/supervisor/editCourse/${courseName}`, formData, { headers })
      .subscribe(
        (response: any) => {
          if (response.status === 'ok') {
            console.log("Course Updated Successfully")
            this.closePopupEditCourse();
            this.getCourseDetails(this.courseId)
          } else {
            // Handle error
          }
        },
        (error) => {
          console.error('Error updating track:', error);
          // Handle error
        }
      );
  }


  deleteCourse() {
    const token = this.authService.getToken();
    if (token && this.course) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      const courseId = this.course.courseId; // Assuming 'id' is the property representing the course ID
      if (courseId) {
        this.http.delete<any>(`http://localhost:3000/project/supervisor/deleteCourse/${courseId}`, { headers }).subscribe(
          (response: any) => {
            if (response.status === 'ok') {
              console.log("Course Deleted Successfully")
              this.closePopupDeleteCourse()
              this.router.navigate(['track-view', this.trackId]);

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
      (response: any) => {
        if (response.status === 'OK') {
          console.log('Course topic added successfully:', response);
          this.getCourseTopics(this.courseId);
          this.closePopupAddCourseTopic();
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        console.error('Error adding course topic:', error);
        this.errorMessage = 'An error occurred while adding course topic';
      }
    );
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



  getSurveyID(): void {
    const url = `http://localhost:3000/project/student/surveyID/course/${this.courseId}`; // Adjust the URL
    this.http.get<{ surveyID: number }>(url, {}).subscribe(
      (data: { surveyID: number }) => {
        if (data && data.surveyID) {
          this.surveyID = data.surveyID;
          console.log('Survey ID:', this.surveyID);
        } else {
          this.surveyID = -1;
        }
      },
      (error: any) => {
        console.error('Error fetching survey ID:', error);
      }
    );
  }
  getParticipants(): void {
    const url = `http://localhost:3000/project/student/participants/${this.trackId}/${this.courseId}`;
    this.http.get<any>(url).subscribe(
      (data: any) => {
        if (data && data.supervsior && data.students) {
          this.supervisor = {
            supervisorID: data.supervsior.id,
            supervisorFname: data.supervsior.name.split(' ')[0],
            supervisorLname: data.supervsior.name.split(' ')[1]
          };

          this.students = data.students.map((student: any) => ({
            studentID: student.id,
            studentFname: student.name.split(' ')[0],
            studentLname: student.name.split(' ')[1]
          }));

          console.log('Supervisor:', this.supervisor);
          console.log('Students:', this.students);
        } else {
          console.error('No participants found.');
        }
      },
      (error: any) => {
        console.error('Error fetching participants:', error);
      }
    );
  }
  getAssessmentsForCourse(courseId: number): void {
    const url = `http://localhost:3000/project/student/courseAssessments/${this.courseId}`; // Change the URL to your API endpoint
    this.http.get<any>(url).subscribe(
      (response) => {
        for (const assessment of response.result) {
          if (assessment.assessmentType === 'Assignment/Online') {
            this.assignmentsOnline.push(assessment);
          } else if (assessment.assessmentType === 'Assignment/Submission') {
            this.assignmentsSubmission.push(assessment);
          } else if (assessment.assessmentType === 'Quiz') {
            this.quizzes.push(assessment);
          } else if (assessment.assessmentType === 'Project') {
            this.projects.push(assessment);
          }
          else if(assessment.assesmentType==='Teaching Assessment')
            console.log("initializing teaching assessment ")
            this.teachingAssessment=assessment
        }
        for (const submissionFile of response.submissionAssessments) {
          if (submissionFile.type === 'Project') {
            console.log("fileSize", submissionFile.file.size)
            this.projects.push(submissionFile)
          }
          else if (submissionFile.type === 'Assignment/Submission')
            this.assignmentsSubmission.push(submissionFile)
        }
        console.log(this.projects)
        console.log(this.assignmentsSubmission)
        console.log("TEACHING ASSS", this.teachingAssessment)
      },
      (error) => {
        console.error('Error fetching assessments:', error);
      }
    );
  }


  isPastDeadline(deadline: Date): boolean {
    return new Date() > new Date(deadline);
  }
  downloadFile(file: any): void {
    const blob = new Blob([file.buffer], { type: file.mimetype });
    console.log("buffer length", file.buffer.length)
    console.log("fileSize", file.size)


    console.log('Blob size:', blob.size);

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.originalname;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }


  AddCourseILOWeight(): void {
    if (this.selectedCourseIloIndex !== null && this.selectedCourseIloIndex !== null) {
      const sselectedCourseIlo = this.courseIlos[this.selectedCourseIloIndex];
      if (sselectedCourseIlo) {
        const courseId = this.courseId;
        const courseIloId = sselectedCourseIlo.courseIloId;
        const weight = this.courseIloWeight;


        const updateData = {
          COURSE_ID_FK: courseId,
          WEIGHT: weight
        };

        const token = this.authService.getToken();
        if (token) {
          const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
          this.http.post<any>(`http://localhost:3000/project/supervisor/AddcourseILoWight/${courseIloId}`, updateData, { headers })
            .subscribe(
              (response: any) => {
                if (response.status === "ok") {
                  console.log('CourseILO Weight Added successfully:', response);
                  this.closePopUpAddCourseILOWeight()
                  this.getCourseIlo(this.courseId);
                }

              },
              (error) => {
                console.error('Error Adding Course Weight:', error);
                // Optionally, display an error message or perform other error handling
              }
            );
        } else {
          console.error('No authentication token available');
          // Optionally, redirect to login page or display an error message
        }
      } else {
        console.error('Selected course or track ILO not found');
      }
    } else {
      console.error('Selected course index, track ILO index, or weight not selected');
    }
  }
  createCourseSurvey(): void {
    // Define the survey data to send in the request body
    const surveyData = {
      courseID: this.courseId, // Assuming courseId is not provided in this example
    };

    // Make an HTTP POST request to the API endpoint
    this.http.post<any>('http://localhost:3000/project/supervisor/createSurvey', surveyData)
      .subscribe(
        response => {
          // Check the status code of the response
          if (response && response.message === 'Survey Added') {
            alert('Survey added successfully');
            this.router.navigate(['/createSurvey', response.surveyID]);

          } else {
            alert('Failed to add survey');
            // Handle unexpected response, if needed
          }
        },
        error => {
          console.error('Error adding survey:', error);
          // Handle error, if needed
        }
      );
  }
  createInstructorSurvey(): void {
    // Define the survey data to send in the request body
    const surveyData = {
      courseID: this.courseId, // Assuming courseId is not provided in this example
      instructorID:this.instructorID
    };

    // Make an HTTP POST request to the API endpoint
    this.http.post<any>('http://localhost:3000/project/supervisor/createSurvey', surveyData)
      .subscribe(
        response => {
          // Check the status code of the response
          if (response && response.message === 'Survey Added') {
            alert('Survey added successfully');
            console.log("SURVEY ID = ", response.surveyID)
            this.router.navigate(['/createSurvey', response.surveyID]);

          } else {
            alert('Failed to add survey');
            // Handle unexpected response, if needed
          }
        },
        error => {
          console.error('Error adding survey:', error);
          // Handle error, if needed
        }
      );
  }

  navigateToCourseProgress():void { 
    this.router.navigate(['/view-progress', this.courseId]);

  }
  getInstructorID(): Promise<void> {
    const url = `http://localhost:3000/project/supervisor/getInstructorID/${this.courseId}`;
    return new Promise((resolve, reject) => {
      this.http.get<{ instructorID: number }>(url).subscribe(
        (response) => {
          this.instructorID = response.instructorID;
          console.log('Instructor ID:', this.instructorID);
          resolve();
        },
        (error) => {
          console.error('Error fetching instructor ID:', error);
          reject(error);
        }
      );
    });
  }
  getInstructorSurveyID(): void {
    console.log("INSSTTTTTT ID = ", this.instructorID)
    const url = `http://localhost:3000/project/student/getSurveyInstructorID/${this.courseId}/${this.instructorID}`;
    this.http.get<{ instructorSurveyID: number }>(url).subscribe(
      (response) => {
        console.log("get method", response)
        this.instructorSurveyID = response.instructorSurveyID;
        console.log('instructor SurveyID :', this.instructorSurveyID);
      },
      (error) => {
        console.error('Error fetching instructor survey ID:', error);
      }
    );
  }


  //// deadline 
  isDeadlinePassed(deadline: Date): boolean {
    return new Date(deadline).getTime() < new Date().getTime();
  }
}

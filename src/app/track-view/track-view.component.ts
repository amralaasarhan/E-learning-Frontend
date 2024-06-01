import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CourseServices } from '../course/course.service';
import { Course } from '../course/course';

import { AuthServiceService } from '../Auth/auth-service.service';
import { UserService } from 'src/app/user/user.service';

import { TrackIlo } from 'src/app/track/track-ilo';
import { Track } from 'src/app/track/track';
import { TrackService } from 'src/app/track/track.service';

import { AssessmentService } from 'src/app/Assessment/assessment.service';
import { IAddAssessmentResponse } from 'src/app/Assessment/iadd-assessment-response';

@Component({
  selector: 'app-track-view',
  templateUrl: './track-view.component.html',
  styleUrls: ['./track-view.component.css']
})
export class TrackViewComponent implements OnInit {
  errorMessage: string = '';
  //user data
  userData: any;

  //Track Data
  track: Track = { trackId: 0, title: '', trackImage: '', description: '', courses: [], supervisorFk: 0 }


  //TrackIlo Data
  trackIlos: TrackIlo[] = [];
  selectedTrackIloIndex: number | null = null;


  //Add Course Popup
  showAddCoursePopup: boolean = false;
  selectedCourseType: string = 'existing';
  courseName: string;
  courseLevel: string;
  courseFile: File | null = null;
  courseFileName: string = '';
  existingCourses: Course[] = [];
  selectedExistingCourseId: any;
  selectedCourseInfo: string = '';
  showPopupCourseWeight: boolean = false;
  trackILOCourses: Course[] = [];
  selectedCourseIndex: number | null = null;
  imageCourseData: File | null = null;
  fileCourseName: string = '';
  trackId: any;
  courseHours: any;
  courses: Course[] = [];

  //view track details
  showViewTrackDetailsPopup: boolean = false;

  //view track ILo Detials
  showViewTrackILODetailsPopUp: boolean = false;

  //Edit Track 
  showEditTrackPopup: boolean = false;
  newTitle: string = '';
  newDescription: string = '';
  imageData: File | null = null;
  fileName: string = '';

  //Delete Track
  showDeleteTrackPopup: boolean = false;

  //Add Track ILO
  showAddTrackILoPopup: boolean = false;
  trackIlo: TrackIlo = { trackIloId: 0, trackOutcome: '', trackType: '', trackId: 0, trackDescription: '' };

  //Edit Track ILO
  showEditTrackILoPopup: boolean = false;

  //delete track ilo
  showDeleteTrackILOPopup: boolean = false;

  //Add course weight
  showCourseWeightPopup: boolean = false;
  courseWeight: number | null = null;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService,
    private http: HttpClient,
    private courseService: CourseServices,
    private trackService: TrackService,

  ) {

    this.courseName = '';
    this.courseLevel = '';
    this.courseHours = 0;
    this.trackId = 0;
  }

  ngOnInit(): void {
    this.userData = this.authService.getUserData();
    this.trackId = this.route.snapshot.params['trackId'];
    this.getTrackDetails(this.trackId);
  }

  navigateToCourseView(trackId: number, courseId: number) {
    this.router.navigate(['/course-view', trackId, courseId]);
  }
  getTrackDetails(trackId: number): void {
    this.trackService.getTrackById(trackId)
      .subscribe(track => {
        if (track) {
          this.track = track;

          this.trackId = this.track.trackId
          this.getCoursesInTrack(this.trackId);
          this.getTrackIlo(this.trackId);
        } else {
          console.error('Track data not found');
        }
      });
  }

  getCoursesInTrack(trackId: number): void {
    this.courseService.getCoursesInTrack(trackId)
      .subscribe(courses => {
        this.courses = courses;
        console.log('Retrieved courses:', courses); // Add this console log statement
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

  //Popups
  openPopUpAddCourse(): void {
    this.showAddCoursePopup = true;
  }

  closeAddCoursePopup(): void {
    this.getCoursesInTrack(this.trackId);
    this.showAddCoursePopup = false;
  }

  openViewTrackDetailsPopUp(): void {
    this.showViewTrackDetailsPopup = true;
  }

  closeViewTrackDetailsPopUp(): void {
    this.showViewTrackDetailsPopup = false;
  }

  openViewTrackILODetailsPopUp(): void {
    this.showViewTrackILODetailsPopUp = true;
  }

  closeViewTrackILODetailsPopUp(): void {
    this.showViewTrackILODetailsPopUp = false;
  }

  openAddCourseWeightPopUp(): void {
    this.showCourseWeightPopup = true;
  }

  closeAddCourseWeightPopUp(): void {
    this.showCourseWeightPopup = false;
  }


  openEditTrackPopup(): void {
    this.showEditTrackPopup = true;
  }

  closeEditTrackPopup(): void {
    if (this.track) {
      if (this.newTitle) {
        this.track.title = this.newTitle;
      } else {
        this.track.title = this.track.title
      }
      // Reset newTitle and newDescription
      this.newTitle = '';
      this.newDescription = '';
    } else {
      console.error('Track is null, cannot update title');
    }
    this.showEditTrackPopup = false;
  }

  openDeleteTrackPopUp(): void {
    this.showDeleteTrackPopup = true;
  }

  closeDeleteTrackPopUp(): void {
    this.showDeleteTrackPopup = false;
  }

  openAddTrackILoPopUp(): void {
    this.showAddTrackILoPopup = true;
  }

  closeAddTrackILoPopUp(): void {
    this.showAddTrackILoPopup = false;
  }

  openEditTrackILoPopUp(): void {
    this.showEditTrackILoPopup = true;
  }

  closeEditTrackILoPopUp(): void {
    this.showEditTrackILoPopup = false;
  }

  openDeleteTrackILOPopUp(): void {
    this.showDeleteTrackILOPopup = true;
  }

  closeDeleteTrackILOPopUp(): void {
    this.showDeleteTrackILOPopup = false;
  }

  ////////////////////////////////////////////////////////////////
  fetchExistingCourses(): void {
    this.courseService.getAllCourses()
      .subscribe(
        courses => {
          console.log('Fetched Courses:', courses);
          this.existingCourses = courses;
          const selectedCourseId = parseInt(this.selectedExistingCourseId, 10);
          const selectedCourse = this.existingCourses.find(course => course.courseId === selectedCourseId);
          console.log('Selected Course:', selectedCourse);
          this.selectedCourseInfo = selectedCourse ? `Selected Course: ${selectedCourse.courseName}` : '';
        },
        error => {
          console.error('Error fetching existing courses:', error);
          // Handle error as needed
        }
      );
  }

  onCourseTypeChange(): void {
    if (this.selectedCourseType === 'existing') {
      this.fetchExistingCourses();
    } else {
      this.selectedCourseInfo = '';
    }
  }

  onCourseSelectionChange(): void {
    if (this.showPopupCourseWeight) {
      // Call the function related to adding course weight
      this.onCourseSelectionChangeForWeight();
    } else {
      // Call the function related to some other action
      this.onCourseSelectionChangeForSomeOtherAction();
    }
  }

  onCourseSelectionChangeForWeight(): void {
    if (this.selectedCourseIndex !== null) {
      const selectedCourse = this.trackILOCourses[this.selectedCourseIndex];
      console.log('Selected Course:', selectedCourse); // Add this line to check the selected course
      if (selectedCourse) {
        console.log('Selected Course:', selectedCourse);
        if (this.selectedTrackIloIndex !== null) {
          const selectedTrackIlo = this.trackIlos[this.selectedTrackIloIndex];
          if (selectedTrackIlo) {
            console.log('Selected Track ILO:', selectedTrackIlo);
          } else {
            console.error('No track ILO selected or invalid index');
          }
        }
      } else {
        console.error('No course selected or invalid index');
      }
    }
  }

  onCourseSelectionChangeForSomeOtherAction(): void {
    console.log("selected course id: ", this.selectedExistingCourseId);
    const selectedCourseId = parseInt(this.selectedExistingCourseId, 10); // Ensure selectedExistingCourseId is of type number
    const selectedCourse = this.existingCourses.find(course => course.courseId === selectedCourseId);
    console.log('Selected Course:', selectedCourse); // Log the selected course
    this.selectedCourseInfo = selectedCourse ? `Selected Course: ${selectedCourse.courseName}` : '';
  }

  onFileCourseSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.imageCourseData = files[0]; // Assign the selected file to imageData
      if (this.imageCourseData) {
        this.fileCourseName = this.imageCourseData.name; // Store the name of the selected file
      }
    }
  }

  addCourseToTrack(): void {
    let bodyData: FormData = new FormData();

    if (this.selectedCourseType === 'existing') {
      bodyData.append('courseType', this.selectedCourseType);
      bodyData.append('trackId', this.trackId);
      bodyData.append('courseId', this.selectedExistingCourseId);

      console.log('Request trackId', this.trackId);

      console.log('Request courseId', this.selectedExistingCourseId);
      console.log('Request Body for Existing Course:', bodyData);
    } else {
      if (this.imageCourseData) {
        bodyData.append('courseImage', this.imageCourseData);
      }

      bodyData.append('trackId', this.trackId);
      bodyData.append('courseName', this.courseName);
      bodyData.append('courseType', this.selectedCourseType);
      bodyData.append('courseLevel', this.courseLevel);
      bodyData.append('courseHours', this.courseHours);

      console.log('Request trackId', this.trackId);

      console.log('Request Body for New Course:', bodyData);
    }

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    this.http.post<any>('http://localhost:3000/project/supervisor/addCourseToTrack', bodyData, { headers }).pipe(
    ).subscribe(
      response => {
        console.log('Response after adding course:', response); // Log the response
        // Refresh the list of courses
        this.getCoursesInTrack(this.trackId);
        // Close the add course popup
        this.closeAddCoursePopup();
      },
      error => {
        console.error('Error adding course to track:', error);
        // Handle error, if needed
      }
    );
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


  updateTrack(): void {
    const updateData = {
      TRACK_TITLE: this.newTitle,
      TRACK_DESCRIPTION: this.newDescription
    };



    const formData = new FormData();
    formData.append('updateData', JSON.stringify(updateData)); // Append update data
    if (this.imageData) {
      formData.append('trackImage', this.imageData); // Append image data
    }

    const trackTitle = this.track?.title;
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'authorization': `Bearer ${token}` });

    this.http.put<any>(`http://localhost:3000/project/supervisor/editTrack/${trackTitle}`, formData, { headers })
      .subscribe(
        (response: any) => {
          if (response.status === 'OK') {
            console.log("Track updated successfully");
            this.getTrackDetails(this.trackId)
            this.closeEditTrackPopup();
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

  deleteTrack() {
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

      const trackTitle = this.track?.title;
      console.log(trackTitle)
      if (trackTitle) {
        this.http.delete<any>(`http://localhost:3000/project/supervisor/deleteTrack/${trackTitle}`, { headers }).subscribe(
          (response: any) => {
            if (response.status === 'ok') {
              this.closeDeleteTrackPopUp();
              this.router.navigate(['./supervisorTracks']);
            } else {
              this.errorMessage = response.message || 'Invalid login';
            }
          },
          (error) => {
            console.error('Error deleting track:', error);
            this.errorMessage = 'An error occurred while deleting track';
          }
        );
      } else {
        console.error('Track title is null, cannot delete track');
      }
    } else {
      console.error('No authentication token available or track is null');
    }
  }

  addTrackIlo(): void {
    const bodyData = {
      trackOutcome: this.trackIlo.trackOutcome,
      trackType: this.trackIlo.trackType,
      trackId: this.trackId,
      trackDescription: this.trackIlo.trackDescription
    };

    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this.http.post<any>('http://localhost:3000/project/supervisor/addTrackIlo', bodyData, { headers }).subscribe(
        (response: any) => {
          if (response.status === 'OK') {
            this.closeAddTrackILoPopUp();
            console.log('Track ILO Added successfully:', response);
            this.getTrackIlo(this.trackId);
          } else {
            this.errorMessage = response.message;
          }
        },
        (error) => {
          console.error('Error adding track:', error);
          this.errorMessage = 'An error occurred while adding track';
        }
      );
    } else {
      console.error('No authentication token available');
    }
  }

  updateTrackILO() {
    const currentTrackIlo = this.getCurrentTrackIlo();
    if (currentTrackIlo) {
      const updateData = {
        TRACK_OUTCOME: currentTrackIlo.trackOutcome,
        TRACK_TYPE: currentTrackIlo.trackType,
        TRACK_ILO_DESCRIPTION: currentTrackIlo.trackDescription
      };

      const trackIloId = currentTrackIlo.trackIloId;
      console.log("trackiloid", trackIloId)
      const token = this.authService.getToken();
      console.log('Token:', token);
      if (token) {
        const headers = new HttpHeaders({ 'authorization': `Bearer ${token}` });
        console.log('Request Headers:', headers);
        this.http.put<any>(`http://localhost:3000/project/supervisor/updateTrackIlo/${trackIloId}`, updateData, { headers })
          .subscribe(
            (response: any) => {

              if (response.status === 'OK') {
                this.closeEditTrackILoPopUp();
                console.log('Track ILO updated successfully:', response);
                this.getTrackIlo(this.trackId);
              } else {
                this.errorMessage = response.message;
              }
            },
            (error) => {
              console.error('Error updating track ILO:', error);
              // Optionally, display an error message or perform other error handling
            }
          );
      } else {
        console.error('No authentication token available');
        // Optionally, redirect to login page or display an error message
      }
    } else {
      console.error('No track ILO selected or invalid index');
    }
  }

  getCurrentTrackIlo(): TrackIlo | null {
    if (this.selectedTrackIloIndex !== null && this.trackIlos.length > this.selectedTrackIloIndex) {
      return this.trackIlos[this.selectedTrackIloIndex];
    }
    return null;
  }

  deleteTrackIlo() {
    const currentTrackIlo = this.getCurrentTrackIlo();
    if (currentTrackIlo) {
      const trackIloId = currentTrackIlo.trackIloId;
      const token = this.authService.getToken();
      if (token) {
        const headers = new HttpHeaders({ 'authorization': `Bearer ${token}` });
        console.log('Request Headers:', headers);
        this.http.delete<any>(`http://localhost:3000/project/supervisor/deleteTrackIlo/${trackIloId}`, { headers }).subscribe(
          (response: any) => {
            if (response.status === "ok") {
              console.log('Track ILO deleted successfully:', response);
              this.closeDeleteTrackILOPopUp()
              this.getTrackIlo(this.trackId);
            }

          },
          (error) => {
            console.error('Error deleting track ILO:', error);
            // Optionally, display an error message or perform other error handling
          }
        );
      } else {
        console.error('No authentication token available');
        // Optionally, redirect to login page or display an error message
      }
    } else {
      console.error('No track ILO selected or invalid index');
    }
  }


  AddCourseWeight(): void {
    if (this.selectedCourseIndex !== null && this.selectedTrackIloIndex !== null) {
      const selectedCourse = this.trackILOCourses[this.selectedCourseIndex];
      const selectedTrackIlo = this.trackIlos[this.selectedTrackIloIndex];
      if (selectedCourse && selectedTrackIlo) {
        const courseId = selectedCourse.courseId;
        const trackIloId = selectedTrackIlo.trackIloId;
        const weight = this.courseWeight;

        console.log('Selected Course:', selectedCourse);
        console.log('Selected Track ILO:', selectedTrackIlo);

        const updateData = {
          COURSE_ID_FK: courseId,
          WEIGHT: weight
        };

        const token = this.authService.getToken();
        if (token) {
          const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
          this.http.post<any>(`http://localhost:3000/project/supervisor/AddcourseWeightToTrackILo/${trackIloId}`, updateData, { headers })
            .subscribe(
              (response: any) => {
                if (response.status === "ok") {
                  console.log('Course Weight Added successfully:', response);
                  this.closeDeleteTrackILOPopUp()
                  this.getTrackIlo(this.trackId);
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


  getCurrentCourse(): Course | null {
    if (this.selectedCourseIndex !== null && this.trackILOCourses.length > this.selectedCourseIndex) {
      return this.trackILOCourses[this.selectedCourseIndex];
    }
    return null;
  }


  getCoursesForTrackILO(trackIloId: number): void {
    console.log("TrackiLO id enter in getcourseFor ilo", trackIloId)
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

      this.http.get<any>(`http://localhost:3000/project/supervisor/getCourseForThisTrackILO/${trackIloId}`, { headers })
        .subscribe(
          (response: any) => {
            if (response.status === 'OK') {
              const coursesArray = response.coursesArray;
              console.log('Courses Array:', coursesArray);

              this.trackILOCourses = coursesArray;
            } else {
              console.error('Track ILO details not found or coursesArray is missing');
            }
          },
          (error) => {
            console.error('Error fetching Track ILO courses:', error);
          }
        );
    } else {
      console.error('No authentication token available');
    }
  }


  onSelectTrackIlo(): void {
    // Get all courses for the selected track ILO
    if (this.selectedTrackIloIndex !== null) {
      const selectedTrackIlo = this.trackIlos[this.selectedTrackIloIndex];
      this.getCoursesForTrackILO(selectedTrackIlo.trackIloId);
    }
  }


  createSurvey(): void {
    // Define the survey data to send in the request body
    const surveyData = {
      courseID: null, // Assuming courseId is not provided in this example
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


}

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../../Auth/auth-service.service';

@Component({
  selector: 'app-p-supervisor-layout',
  templateUrl: './p-supervisor-layout.component.html',
  styleUrls: ['./p-supervisor-layout.component.css']

})
export class PSupervisorLayoutComponent implements OnInit {
  title: string = '';
  description: string = '';
  errorMessage: string = '';
  showAddTrackPopup: boolean = false;
  user: any;
  imageData: File | null = null;
  fileName: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService
  ) { }

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log(userData);
      this.user = userData[5] || userData.fName;
    } else {
      console.error('User data not found in local storage');
    }
  }

  onFileSelected(event: any): void {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.imageData = files[0]; 
      if (this.imageData) {
        this.fileName = this.imageData.name; 
      }
    }
  }



  addTrack(): void {
    const bodyData = new FormData(); 
    if (this.imageData) {
      bodyData.append('trackImage', this.imageData);
    }
    bodyData.append('title', this.title);
    bodyData.append('description', this.description);
    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this.http.post<any>('http://localhost:3000/project/supervisor/addTrack', bodyData, { headers }).subscribe(
        (response: any) => {
          if (response.status === 'OK') {
            this.title = '';
            this.description = '';
            this.closeAddTrackPopup();
            console.log('Track added successfully:');
          } else {
            this.errorMessage = response.message || 'Invalid login';
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


  
  navigateToMyTracks() {
    this.router.navigate(["/supervisorTracks"]);
  }
  navigateToMyCourses() {
    this.router.navigate(["/supervisorCourses"]);
  }


  openAddTrackPopup(): void {
    this.showAddTrackPopup = true;
  }

  closeAddTrackPopup(): void {
    this.showAddTrackPopup = false;
  }

  logout(): void {
    this.authService.logout();
  }

}

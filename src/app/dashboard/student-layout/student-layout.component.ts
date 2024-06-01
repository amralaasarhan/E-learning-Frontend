
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../../Auth/auth-service.service';
@Component({
  selector: 'app-student-layout',
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css']
})

export class StudentLayoutComponent implements OnInit {
  title: string = '';
  description: string = '';
  errorMessage: string = '';
  showPopup: boolean = false;
  user: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      console.log(userData);// Access 'lName' property from the parsed userData object
      this.user = userData[5]||userData.fName;
    } else {
      console.error('User data not found in local storage');
    }
  }
  

  addTrack(): void {
    const bodyData = {
      title: this.title,
      description: this.description
    };

    const token = this.authService.getToken();
    if (token) {
      const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
      this.http.post<any>('http://localhost:3000/project/supervisor/addTrack', bodyData, { headers }).subscribe(
        (response: any) => {
          if (response.status === 'OK') {
            // Update user data after adding the track
            this.user = response.user;
            // Store updated user data in local storage
            localStorage.setItem('user', JSON.stringify(this.user));
            this.closePopup();
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
    this.router.navigate(["/RegisteredTracks"]);
  }
  navigateToMyCourses() {
    this.router.navigate(["/RegisteredCourses"]);
  }
  navigateToAllTracks() {
    this.router.navigate(["/AllTracks"]);
  }
  navigateToAskExpert() {
    this.router.navigate(["/messageExpert"]);
  }
  navigateToAskSupervisor() {
    this.router.navigate(["/message-supervisor"]);
  }
  navigateToAddportfolio() {
    this.router.navigate(["/portfolio"]);
  }
  navigateToupdatePortfolio() {
    this.router.navigate(["/updatePortfolio"]);
  }
  openPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }
}

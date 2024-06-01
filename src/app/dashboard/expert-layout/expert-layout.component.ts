import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../../Auth/auth-service.service';


@Component({
  selector: 'app-expert-layout',
  templateUrl: './expert-layout.component.html',
  styleUrls: ['./expert-layout.component.css']
})
export class ExpertLayoutComponent implements OnInit {
  title: string = '';
  description: string = '';
  errorMessage: string = '';
  showPopup: boolean = false;
  user: any;

  constructor(
    private http: HttpClient,
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

  openPopup(): void {
    this.showPopup = true;
  }

  closePopup(): void {
    this.showPopup = false;
  }
}

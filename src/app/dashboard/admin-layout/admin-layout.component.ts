import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
   usernames: any[] =[];
   close: EventEmitter<void> = new EventEmitter<void>();
  user: any;
  isPopupVisible = false;

  constructor(private userService: UserService, private http: HttpClient,private router: Router,private authService: AuthServiceService) {}
  ngOnInit(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
    } else {
      // Handle the case when user data is not available in local storage
      console.error('User data not found in local storage');
    }
  }

  getExpertData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/project/admin/usernames');
  }
  fetchUsernames(): void {
    this.getExpertData().subscribe(
      (usernames: string[]) => {
        this.usernames = usernames;
      },
      (error) => {
        console.error('Error fetching usernames:', error);
      }
    );
  }
  openBlockUserPopup(): void {
    this.fetchUsernames();
    this.isPopupVisible = true;
  }

  closePopup(): void {
    this.isPopupVisible=false;
  }
 

  blockUser(name: string): void {
    const bodyData = {
        username: name
    };

    this.http.post<any>('http://localhost:3000/project/admin/block', bodyData).subscribe(
        (response: any) => {
            if (response.success) {
                // Handle successful user blocking
                console.log('User blocked successfully');
                // Perform any other actions as needed
                this.closePopup();
            } else {
                // Handle error response
                console.error('Error blocking user:', response.error);
                // Display error message or take appropriate action
                const errorMessage = response.error || 'Error blocking user';
            }
        },
        (error) => {
            // Handle HTTP error
            console.error('Error blocking user:', error);
            const errorMessage = 'An error occurred while blocking the user';
        }
    );
}

}

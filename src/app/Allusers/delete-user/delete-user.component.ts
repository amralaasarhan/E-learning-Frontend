import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthServiceService } from '../../Auth/auth-service.service';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent {

  constructor(
    private router: Router,
    private location: Location,
    private http: HttpClient,
    private authService: AuthServiceService 
  ) { }

  deleteUser(): void {
    const token = this.authService.getToken(); // Retrieve token from AuthServiceService
    console.log('Token:', token);
    if (token) {
      const headers = new HttpHeaders({ 'authorization': `Bearer ${token}` }); // Create headers with the token
      console.log('Request Headers:', headers);
      this.http.delete<any>('http://localhost:3000/project/deleteUser', { headers }).subscribe(
        (response: any) => {
          console.log('User deleted successfully');
          // Check if the token was sent in the request headers
          if (response.headers && response.headers.has('Authorization')) {
            console.log('Token was sent in the request headers');
          } else {
            console.log('Token was not sent in the request headers');
          }
          this.router.navigate(['']);
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting user:', error);
        }
      );
    } else {
      console.error('No authentication token available');
    }
  }

  cancel() {
    this.location.back();
  }
}

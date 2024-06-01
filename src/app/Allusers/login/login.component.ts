import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // Import HttpHeaders

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  pass: string = '';
  userType: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    const bodyData = {
      email: this.email,
      pass: this.pass,
      userType: this.userType
    };

    this.http.post<any>('http://localhost:3000/project/login', bodyData).subscribe(
      (response: any) => {
        if (response.status === 'OK') {
          const token = response.token;
          const user = response.user; // User data from the backend response
          console.log("user",user)
          // Store token and user data in local storage
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));

          // Add token to request headers
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          // Redirect based on user type
          switch (this.userType) {
            case 'student':
              this.router.navigate(['/student-dashboard']);
              break;
            case 'path_supervisor':
              this.router.navigate(['/supervisor-dashboard']);
              break;
            case 'instructor':
              this.router.navigate(['/instructor-dashboard']);
              break;
            case 'expert':
              this.router.navigate(['/expert-dashboard']);
              break;
            case 'company_representative':
              this.router.navigate(['/companyRepresentative-dashboard']);
              break;
            case 'admin':
              this.router.navigate(['/admin-dashboard']);
              break;
            default:
              // Handle invalid user type
              this.errorMessage = 'Invalid user type';
              break;
          }
        } else {
          // Handle invalid login
          this.errorMessage = response.message || 'Invalid login';
        }
      },
      (error) => {
        console.error('Error logging in:', error);
        this.errorMessage = 'An error occurred during login';
      }
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../../Auth/auth-service.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  profileForm: FormGroup;
  user: any;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthServiceService,
    private userService: UserService
  ) {
    this.profileForm = this.fb.group({
      fields: [[], Validators.required], // Initialize fields as an empty array
      FNAME: [''],
      LNAME: [''],
      EMAIL: [''],
      USERNAME: [''],
      PASS: [''],
      MOBILE: [''],
      DOB: ['']
    });
  }

  ngOnInit(): void {
    const storedUserData = localStorage.getItem('user');
    if (storedUserData) {
      this.user = JSON.parse(storedUserData);
    } else {
      this.user = this.userService.getUser();
    }
  }
  isFieldSelected(field: string): boolean {
    const fieldsControl = this.profileForm.get('fields');
    return fieldsControl && fieldsControl.value && fieldsControl.value.includes(field);
  }

  toggleFieldValidators(): void {
    const selectedFieldsControl = this.profileForm.get('fields');
    const fields = ['FNAME', 'LNAME', 'EMAIL', 'USERNAME', 'PASS', 'MOBILE', 'DOB'];

    fields.forEach(field => {
      const formControl = this.profileForm.get(field);
      if (formControl) {
        if (this.isFieldSelected(field)) {
          formControl.setValidators(Validators.required);
        } else {
          formControl.clearValidators();
        }
        formControl.updateValueAndValidity();
      }
    });
  }

  updateProfile(userData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.put<any>('http://localhost:3000/project/updateProfile', userData, { headers }).pipe(
      map(response => this.mapResponse(response))
    );
  }

  onSubmit(): void {
    
    
    if (this.profileForm.valid) {
      const userDataToUpdate = this.profileForm.value;
      this.updateProfile(userDataToUpdate).subscribe(
        response => {
          console.log('Profile updated successfully:', response);
          localStorage.setItem('user', JSON.stringify(response.user));
          // Update the user object in the component
          this.user = response.user;
          // Optionally, handle success response
          const token = localStorage.getItem('token');
          const user = localStorage.getItem('user');
        },
        error => {
          console.error('Failed to update profile:', error);
          // Optionally, handle error response
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }

  // Optional: Map response data if needed
  private mapResponse(response: any): any {
    // Map response data as needed
    return response;
  }
}

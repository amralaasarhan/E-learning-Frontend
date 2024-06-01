import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../Auth/auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any; // User object to store user information

  constructor(
    private http: HttpClient,
    private authService: AuthServiceService
  ) { }

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    
    const userData = localStorage.getItem('user');
    if (userData) {
      return JSON.parse(userData);
    } else {
      return null;
    }
  }

}

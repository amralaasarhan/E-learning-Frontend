import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private tokenKey = 'token';

  constructor(private http: HttpClient, private router: Router,
    private location: Location) {}

 // Method to get the JWT token from the backend (assuming it's stored in a cookie)
  getTokenFromCookie(): Observable<any> {
    return this.http.get<any>('http://localhost:3000'); // Replace this URL with your actual backend endpoint
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserData(): any {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      return {
        // name: decodedToken.name,
        email: decodedToken.email,
        id: decodedToken.id,
        role: decodedToken.role,
        userType: decodedToken.userType
      };
    }
    return null;
  }

  logout(): void {
    // Clear token and user data from local storage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
    // Navigate to the home page
    this.router.navigate(['/']);
  }

}

function jwt_decode(token: string): any {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
}

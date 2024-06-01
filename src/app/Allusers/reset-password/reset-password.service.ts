import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseUrl = 'http://localhost:3000/project'; // Your backend API base URL

  constructor(private http: HttpClient) { }

  sendResetPasswordEmail(formData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/send-reset-email`, formData);
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/reset-password`, { token, newPassword });
  }
}

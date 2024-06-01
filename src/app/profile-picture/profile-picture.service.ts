import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilePictureService {

  private apiUrl = 'http://localhost:3000/project/uploadImage';

  constructor(private http: HttpClient) { }

  uploadProfilePicture(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('profilePicture', file, file.name);

    const headers = new HttpHeaders();
    // You may need to set additional headers based on your server requirements

    const requestOptions = {
      headers,
      withCredentials: true,  // Include this option for sending cookies
    };

    return this.http.post<any>(this.apiUrl, formData, requestOptions);
  }
}

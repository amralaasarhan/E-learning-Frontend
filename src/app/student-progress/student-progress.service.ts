import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface ILOResult {
  name: string;
  totalHypotheticalGrade: number;
  studentGrade: number;
  percentage: number;
}

interface ProgressResponse {
  iloResults: { [key: string]: ILOResult };
  totalProgress: number;
}

@Injectable({
  providedIn: 'root'
})
export class StudentProgressService {
  private apiUrl = 'http://localhost:3000/project/student/getProgress';

  constructor(private http: HttpClient) {}

  
  getProgress(courseID: number): Observable<ProgressResponse> {
    const url = `${this.apiUrl}/${courseID}`;
    return this.http.get<ProgressResponse>(url);
  }
}

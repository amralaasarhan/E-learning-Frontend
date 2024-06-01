import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private apiUrl = 'http://localhost:3000/project/supervisor/feedbackAnalysis';

  constructor(private http: HttpClient) { }

  getFeedbackAnalysis(surveyID: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${surveyID}`);
  }
}

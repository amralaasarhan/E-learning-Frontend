import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  constructor(private http: HttpClient) { }

  addAssessment(assesmentType: string, courseIloId: number): Observable<any> {
    const body = { assesmentType, courseIloId };
    return this.http.post<any>('http://localhost:3000/project/supervisor/addAssesment', body);
  }

  // addAssessment(assesmentType: string, courseIloId: number): Observable<IAddAssessmentResponse> {
  //   return this.http.post<IAddAssessmentResponse>('http://localhost:3000/project/supervisor/addAssesment', {
  //     assesmentType,
  //      courseIloId
  //   });
  //  }

  addAssessmentQuestion(assesmentId: number, question: string, questionType: string, questionLevel: string): Observable<any> {
    const url = `http://localhost:3000/project/supervisor/addAssesmentQuestion`;
    return this.http.post<any>(url, { assesmentId, question, questionType, questionLevel });
  }

  addAnswer(assesmentQuestionId: number, answerText: string, correctAnswer: string): Observable<any> {
    const url = `http://localhost:3000/project/supervisor/addAnswer`;
    return this.http.post<any>(url, { assesmentQuestionId, answerText, correctAnswer });
  }

  getAssessments(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/project/supervisor/getAssessments`);
  }


  getAssessmentQuestionsByAssessmentId(assessmentId: number): Observable<any[]> {
    return this.http.get<any>(`http://localhost:3000/project/supervisor/getAssessmentQuestionsByAssessmentId/${assessmentId}`);
  }


  getAssessmentQuestions(): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/project/supervisor/getAssessmentQuestions`);
  }

  deleteAssessment(assesmentId: number): Observable<any> {
    return this.http.delete(`http://localhost:3000/project/supervisor/deleteAssesment/${assesmentId}`);
  }
}

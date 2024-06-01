import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-survey-feedback',
  templateUrl: './survey-feedback.component.html',
  styleUrls: ['./survey-feedback.component.css']
})
export class SurveyFeedbackComponent implements OnInit {
  survey: any;
  answers: any = {};

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const surveyID = +params['surveyID'];
      this.fetchSurvey(surveyID);
    });
  }

  fetchSurvey(surveyID: number): void {
    const url = `http://localhost:3000/project/student/getSurveyByID/${surveyID}`;
    this.http.get<any>(url).subscribe(
      data => {
        this.survey = data.survey; // Assuming the survey data is nested under 'survey' property
        // Initialize answers object with question IDs
        this.answers = {};
        this.survey.questions.forEach((question:any) => {
          this.answers[question.questionID] = '';
        });
      },
      error => {
        console.error('Error fetching survey:', error);
      }
    );
  }
  

  submitAnswers(): void {
    const  surveyID  = this.survey.surveyID;
    console.log (surveyID)
    // You can adjust this based on your requirement
    const data = {
      surveyID,
      answers: Object.keys(this.answers).map(questionID => ({
        questionID,
        answer: this.answers[questionID]
      }))
    };

    const submitUrl = `http://localhost:3000/project/student/submitSurveyFeedback/${surveyID}`;
    this.http.post(submitUrl, data).subscribe(
      response => {
        alert('Answers submitted successfully')
        console.log('Answers submitted successfully', response);
      },
      error => {
        alert("You've submitted your answers already")
        console.error('Error submitting answers', error);
      }
    );
  }
}
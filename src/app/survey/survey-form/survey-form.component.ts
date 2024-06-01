import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css']
})
export class SurveyFormComponent implements OnInit {
  surveyForm!: FormGroup;
  questions!: FormArray; // Define questions property

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    // Initialize form with FormBuilder
    this.surveyForm = this.fb.group({
      questions: this.fb.array([])
    });

    // Fetch survey ID from route params
    const surveyID = this.route.snapshot.paramMap.get('surveyID');
    if (!surveyID) {
      console.error('Survey ID not found in route params');
      return;
    }
    // You can use the surveyID to fetch any initial data if needed

    // Initialize questions FormArray
    this.questions = this.surveyForm.get('questions') as FormArray;
  }

  // Method to add question field to the form
  addQuestion(): void {
    this.questions.push(this.fb.group({
      question: '',
      q_type: 'text' // Default question type
    }));
  }

  // Method to remove question field from the form
  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  // Method to handle form submission
  submitForm(): void {
    // Handle form submission logic here
    // Extract surveyID from the route snapshot
    const surveyID = this.route.snapshot.paramMap.get('surveyID');

    // Define the survey data to send in the request body
    const surveyData = {
      surveyID: surveyID ? +surveyID : null, // Convert surveyID to a number, or null if not found
      questions: this.surveyForm.value.questions
    };

    // Make an HTTP POST request to the API endpoint
    this.http.post<any>('http://localhost:3000/project/supervisor/addSurveyQuestion/' + surveyID, surveyData)
      .subscribe(
        response => {
          // Check the status code of the response
          if (response && response.message === 'Questions added successfully') {
            console.log('Questions added successfully');
            // Handle successful response, if needed
          } else {
            console.error('Failed to add questions:', response);
            // Handle unexpected response, if needed
          }
        },
        error => {
          console.error('Error adding questions:', error);
          // Handle error, if needed
        }
      );
  }
}

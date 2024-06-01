import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DemoQuestion } from '../Assessments/questionModel';

@Component({
  selector: 'app-assessment-form',
  templateUrl: './assessment-form.component.html',
  styleUrls: ['./assessment-form.component.css']
})
export class AssessmentFormComponent implements OnInit {
   assessmentID!: number 
  assessment: any;
  submittedAnswers: any[] = [];
  questions: DemoQuestion[] = []
  selectedAnswers: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.assessmentID = this.route.snapshot.params['assessmentID'];
    this.getAssessment(this.assessmentID);
  }

  getAssessment(assessmentID: number): void {
    const url = `http://localhost:3000/project/student/assessment/${assessmentID}`;
    this.http.get(url).subscribe((data: any) => {
      this.assessment = data.result;
      console.log(this.assessment)
      this.selectedAnswers = Array(this.assessment.questions.length).fill('');

    });
  }

  submitForm() {
    if (this.selectedAnswers.includes(null) || this.selectedAnswers.includes('')) {
      // If any question is unanswered, show an alert and return
      alert('Please answer all the questions before submitting.');
      return;
    }    
    const isConfirmed = confirm('Are you sure you want to submit?');
    if (!isConfirmed) {
      // If not confirmed, return without submitting
      return;
    }
    const formData = {
      ASSESSMENT_ID: this.assessmentID,
      ASSESSMENT_GRADE: this.assessment.grade,
      ASSESSMENT_TYPE : this.assessment.assessmentType,
      COURSE_ID : this.assessment.courseID,
      answers: this.selectedAnswers.map((answer, index) => {
        return {
          ANSWER: answer,
          A_QUESTION_ID: this.assessment.questions[index].A_QUESTION_ID,
          CORRECT_ANSWER: this.assessment.questions[index].CORRECT_ANSWER,
          WEIGHT: this.assessment.questions[index].WEIGHT,
          GRADE: 0 // Set default grade here
        };
      })
    };
    this.http.post('http://localhost:3000/project/student/submit-answers', formData)
    .subscribe(
      (response) => {
        console.log('Form submitted successfully:', response);
        // Handle success response here
      },
      (error) => {
        console.error('Error submitting form:', error);
        // Handle error response here
      }
    );
    // Log formData to check
    console.log(formData);

    // You can now send formData to your API endpoint or perform any other action
    // Example: this.http.post('your_api_endpoint', formData).subscribe(...)
  }
}
  

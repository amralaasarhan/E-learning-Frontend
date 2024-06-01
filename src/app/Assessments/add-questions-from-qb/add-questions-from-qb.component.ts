import { Component } from '@angular/core';
import { AssessmentService } from '../../Assessment/assessment.service';

@Component({
  selector: 'app-add-questions-from-qb',
  templateUrl: './add-questions-from-qb.component.html',
  styleUrls: ['./add-questions-from-qb.component.css']
})
export class AddQuestionsFromQbComponent {

  questions: any[] = [];

 constructor(  private assessmentService: AssessmentService) { }

 ngOnInit(): void {
  this.assessmentService.getAssessmentQuestions().subscribe(
    data => {
      console.log(data);
      this.questions = data.questions; // Assuming your service returns an object with a 'questions' property
    },
    error => {
      console.error('Error fetching questions:', error);
    }
  );
}

//  fetchQuestions(): void {
//     this.assessmentService.getAssessmentQuestions().subscribe(
//       (data: any) => {
//         console.log('Fetched questions:', data);
//         this.questions = data.questions;
//       },
//       (error) => {
//         console.error('Error fetching assessment questions:', error);
//       }
//     );
//  }
}

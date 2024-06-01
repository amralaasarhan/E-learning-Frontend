import { ChangeDetectorRef, Component } from '@angular/core';
import { AssessmentService } from '../../Assessment/assessment.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-show-assessment-questions',
  templateUrl: './show-assessment-questions.component.html',
  styleUrls: ['./show-assessment-questions.component.css']
})
export class ShowAssessmentQuestionsComponent {


  lastAssessmentId: number  = 0;
  questions: any[] = [];
  
 constructor(
  private assessmentService: AssessmentService,
  private router: Router,
  private route: ActivatedRoute,
  private cdr: ChangeDetectorRef
) { }

ngOnInit(): void {
  this.route.params.subscribe(params => {
    this.lastAssessmentId = +params['lastAssessmentId']; 
    console.log('Last Assessment ID:', this.lastAssessmentId);
  });
  this.cdr.detectChanges(); 
  
  this.assessmentService.getAssessmentQuestionsByAssessmentId(+this.lastAssessmentId).subscribe(
    questions => {
      this.questions = questions;
    },
    error => {
      console.error('Error fetching questions:', error);
    }
  );
}
}


// fetchAssessmentQuestions(): void {
//   this.assessmentService.getAssessmentQuestionsByAssessmentId(this.lastAssessmentId)
//     .subscribe(
//       (data: any) => {
//         if (data && Array.isArray(data)) {
//           this.questions = data; // Assuming your service returns an array of questions directly
//         } else {
//           console.error('Invalid data format received:', data);
//         }
//       },
//       error => {
//         console.error('Error fetching questions:', error);
//       }
//     );
// }


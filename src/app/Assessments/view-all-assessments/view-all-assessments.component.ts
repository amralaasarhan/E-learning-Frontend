import { Component } from '@angular/core';
import { AssessmentService } from 'src/app/Assessment/assessment.service';

@Component({
  selector: 'app-view-all-assessments',
  templateUrl: './view-all-assessments.component.html',
  styleUrls: ['./view-all-assessments.component.css']
})
export class ViewAllAssessmentsComponent {

  assessments: any[] = [];

  constructor(private assessmentService:AssessmentService) { }

  ngOnInit() {
    this.assessmentService.getAssessments().subscribe(data => {
      this.assessments = data.assessments;
    }, error => {
      console.error('Error fetching assessments:', error);
    });
 }

 deleteAssessment(assesmentId: number): void {
  this.assessmentService.deleteAssessment(assesmentId).subscribe(response => {
    console.log('Assessment deleted successfully:', response);
    // Optionally, refresh the list of assessments here
  }, error => {
    console.error('Error deleting assessment:', error);
  });
}
}




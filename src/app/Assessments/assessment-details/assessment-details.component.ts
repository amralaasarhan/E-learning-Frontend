import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../../Assessment/assessment.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assessment-details',
  templateUrl: './assessment-details.component.html',
  styleUrls: ['./assessment-details.component.css']
})
export class AssessmentDetailsComponent {

 assesmentType: string=''; 
 lastAssessmentId: number | undefined;
 selectedAction = '';
 selectedFile: File | null = null;
 assessment = {
    name: '',
    description: '',
    timing: '',
    deadline: '',
    grade: 0
 };



 constructor(private router: Router,private route: ActivatedRoute,private assessmentService: AssessmentService,private http: HttpClient) {}



ngOnInit(): void {
  // const assesmentId = this.route.snapshot.params['assesmentId'];
  this.route.params.subscribe(params => {
    this.assesmentType = params['type'];
    console.log('type =',this.assesmentType);
  });
  this.assessmentService.getAssessments().subscribe(
    data => {
      const assessments = data.assessments;
      if (assessments && assessments.length > 0) {
        this.lastAssessmentId = assessments[assessments.length - 1].ASSESSMENT_ID;
      }
    },
    error => {
      console.error('Error fetching assessments:', error);
    }
  );
}

navigateToSelectedAction() {
  if (this.selectedAction === 'addNew') {
    this.navigateToAddQuestions();
  } else if (this.selectedAction === 'addFromQB') {
    this.navigateToAddFromQB();
  } else {
    alert('Please select an action');
  }
}

navigateToAddQuestions(): void {
  this.router.navigate(['/add-questions',this.lastAssessmentId]);
}
navigateToAddFromQB() {
  this.router.navigate(['/add-questions-from-qb']);
}


onFileSelected(event: any): void {
  if (event.target.files.length > 0) {
    this.selectedFile = event.target.files[0];
  }
}

onSubmit(): void {
  if (!this.selectedFile) {
    alert('Please select a file to upload.');
    return;
  }

  const formData = new FormData();
  formData.append('file', this.selectedFile, this.selectedFile.name);

  this.http.post('http://localhost:3000/project/supervisor/uploadAssessmentFile', formData).subscribe(
    (response: any) => {
      alert('File uploaded successfully. File ID: ' + response.fileId);
    },
    (error) => {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  );
}

}

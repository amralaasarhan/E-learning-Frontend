import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Submission {
  submissionData: {
    submissionID: number;
    fileName: string;
    fileType: string;
    studentID: number;
    courseTopicID: number;
    grade:number;
    total:number;
 
  };
  submissionFile: {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: string;
    size: number;
  };

}

@Component({
  selector: 'app-view-submissions',
  templateUrl: './view-submissions.component.html',
  styleUrls: ['./view-submissions.component.css']
})
export class ViewSubmissionsComponent implements OnInit {
  courseTopicID!: number;
  submissions!: Submission[];

  constructor(private http: HttpClient,    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Retrieve the courseTopicID from the URL
    this.courseTopicID = this.route.snapshot.params['courseTopicID']; // Extract courseId from the URL

    // Fetch submissions from the API
    this.http.get<any>(`http://localhost:3000/project/supervisor/getSubmissions/${this.courseTopicID}`).subscribe(
      (data) => {
        this.submissions = data.submissions;
      },
      (error) => {
        console.error('Error fetching submissions:', error);
      }
    );
  }

  downloadFile(submission: Submission): void {
    // Convert buffer to Blob
    const byteCharacters = atob(submission.submissionFile.buffer);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const fileBlob = new Blob([byteArray], { type: submission.submissionFile.mimetype });

    // Create link to download file
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(fileBlob);
    link.download = submission.submissionData.fileName;
    link.click();
  }
  addGrade(submissionID: number): void {
    // Find the submission with the given ID
    const submission = this.submissions.find(submission => submission.submissionData.submissionID === submissionID);
    if (!submission) {
      console.error('Submission not found');
      return;
    }
  
    // Extract grade and total from the submission
    const grade = submission.submissionData.grade;
    const total = submission.submissionData.total;
  
    // Example API call
    this.http.put<any>(`http://localhost:3000/project/supervisor/gradeSubmission/${submissionID}`, { GRADE: grade, TOTAL: total }).subscribe(
      (response) => {
        alert('Grade added successfully:');
        // Optionally, you can update the UI or handle any success message here
      },
      (error) => {
       alert('Error adding grade:');
        // Optionally, you can handle error scenarios here
      }
    );
}
isValid(submission: any): boolean {
  return submission.submissionData.grade !== undefined && submission.submissionData.grade !== null &&
         submission.submissionData.total !== undefined && submission.submissionData.total !== null &&
         submission.submissionData.grade !== 0 && submission.submissionData.total !== 0;
}
}

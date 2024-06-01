import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.css']
})
export class SubmissionComponent {

  selectedFile: File | null = null;
  mongoId: number | null = null;
  subID: any ; 
  mongoID: any ; 
  courseTopicID!: number
  previousSubmissionID!: number 

  constructor(private route: ActivatedRoute,private http: HttpClient) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
       this.courseTopicID = +params['courseTopicID'];
    
    });
    this.getPreviousSubmissionID(this.courseTopicID)
  }
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit(): Promise<void> {
    try {
        if (!this.selectedFile) {
            console.error('No file selected.');
            return;
        }

        const formData: FormData = new FormData();
        formData.append('file', this.selectedFile);

        // Step 1: Execute the first HTTP request
        const url = `http://localhost:3000/project/student/addSub/${this.courseTopicID}`;

        // Execute the HTTP request
        const addSubResponse = await this.http.post(url, formData).toPromise();
       
        console.log('Submission updated successfully:', addSubResponse);
          console.log('Submission updated successfully:', addSubResponse);

        // Extract filename from the selected file
        const filename = this.selectedFile.name;

        // Step 2: Execute the second HTTP request
        const submissionMongoIdResponse = await this.http.get(`http://localhost:3000/project/student/submissionMongoId/${filename}`).toPromise();
        console.log('id:', submissionMongoIdResponse);
        this.mongoID = submissionMongoIdResponse;

        // Step 3: Execute the third HTTP request
        const body = { "fileName": filename };
        const idResponse = await this.http.post(`http://localhost:3000/project/student/id`, body).toPromise();
        console.log('id:', idResponse);
        this.subID = idResponse;
    } catch (error) {
        console.error('Error updating submission:', error);
        alert("A Submission is already uploaded ")
        // Handle error
    }
}


  onUpdateFile(): void {
    // if (!this.selectedFile || !this.mongoId) {
    //   console.error('File or Mongo ID is missing.');
    //   return;
    // }

    const formData: FormData = new FormData();
    formData.append('file', this.selectedFile!);
    // const body = { "submissionId": this.subID };

    // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend
    const url = `http://localhost:3000/project/student/updateSubmission/${this.mongoID}/${this.subID}`;
    this.http.put(url, formData)
      .subscribe(
        (response) => {
          console.log('File updated successfully:', response);
          // Handle success
        },
        (error) => {
          console.error('Error updating file:', error);
          // Handle error
        }
      );
  }


  onDelete(): void {
    // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend
    this.getPreviousSubmissionID(this.courseTopicID)
    this.http.delete(`http://localhost:3000/project/student/deleteSubmission/${this.subID}`)
      .subscribe(
        (response) => {
          console.log('Submission deleted successfully:', response);
          // Handle success
        },
        (error) => {
          console.error('Error deleting submission:', error);
          // Handle error
        }
      );
  }

  async getPreviousSubmissionID(courseTopicID: number): Promise<void> {
    try {
      const url = `http://localhost:3000/project/student/getPreviousSubmissionID/${courseTopicID}`;
      const response = await this.http.get<{ submissionID: number , mongoID:number}>(url).toPromise();
      if (response && response.submissionID) {
        this.previousSubmissionID = response.submissionID;
        console.log("Previous Mongo ID : ", response.mongoID )
        console.log('Previous Submission ID:', this.previousSubmissionID);
        this.subID=this.previousSubmissionID;
        this.mongoID=response.mongoID;
      } else {
        console.error('No previous submission ID found.');
      }
    } catch (error) {
      console.error('Error fetching previous submission ID:', error);
    }
  }
}

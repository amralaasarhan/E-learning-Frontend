import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-grade-attempt',
  templateUrl: './grade-attempt.component.html',
  styleUrls: ['./grade-attempt.component.css']
})
export class GradeAttemptComponent implements OnInit {
  results: any[] = [];
  totalWeight: number = 0;
  attemptID!:number
  formData: any = {
    attemptID: null,
    answersData: []
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.attemptID = +params['attemptID'];
    });    this.fetchAttemptData();
  }

  fetchAttemptData() {
    // Replace 'attemptID' with the actual attempt ID
  
    const apiUrl = `http://localhost:3000/project/supervisor/ungraded-essay-questions/${this.attemptID}`;

    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.results = data.results;
        this.totalWeight = data.totalWeight;
        console.log("total Weight" ,this.totalWeight)
        // Initialize formData with attemptID
        this.formData.attemptID = this.attemptID;
      },
      (error) => {
        console.error('Error fetching attempt data:', error);
      }
    );
  }

  onSubmit() {
    // Iterate over results to build formData.answersData
    this.formData.answersData = this.results.map(result => ({
      ANSWER_ID: result.ANSWER_ID,
      grade: result.grade
    }));
  
    // Perform submission using formData
    // You can implement this part based on your API requirements
    console.log('Form data:', this.formData);
    const confirmSubmit = confirm('Not all answers have grades. Are you sure you want to submit?');
    if (!confirmSubmit) {
      return;
    }
    const apiUrl = 'http://localhost:3000/project/supervisor/update-student-grades';

    this.http.put(apiUrl, this.formData).subscribe(
      (response) => {
        console.log('Submission successful:', response);
        alert('Submission successful!');
      },
      (error) => {
        console.error('Error submitting data:', error);
        alert('An error occurred while submitting data.');
      }
    );
  }
  
  isInvalidGrade(result: any): boolean {
    const maxGrade = result.WEIGHT * result.GRADE / this.totalWeight;
    return result.grade < 0 || result.grade > maxGrade;
  }
}

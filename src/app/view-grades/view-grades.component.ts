import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-grades',
  templateUrl: './view-grades.component.html',
  styleUrls: ['./view-grades.component.css']
})
export class ViewGradesComponent implements OnInit {
  courseID!: number;
  grades!: any[];

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseID = params['courseID'];
      this.fetchGrades();
    });
  }

  fetchGrades() {
    const apiUrl = `http://localhost:3000/project/student/grades/${this.courseID}`;

    this.http.get<any[]>(apiUrl).subscribe(
      (data:any) => {
        this.grades = data.results;
      },
      (error) => {
        console.error('Error fetching grades:', error);
      }
    );
  }
}

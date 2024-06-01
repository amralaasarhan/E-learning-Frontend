import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ungraded-attempts',
  templateUrl: './ungraded-attempts.component.html',
  styleUrls: ['./ungraded-attempts.component.css']
})
export class UngradedAttemptsComponent implements OnInit {
  ungradedAttempts: any[] = [];
  courseID!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseID = +params['courseID'];
      this.fetchUngradedAttempts();
    });
  }

  fetchUngradedAttempts() {
    const apiUrl = `http://localhost:3000/project/supervisor/ungraded-attempts/${this.courseID}`;

    this.http.get<any>(apiUrl).subscribe(
      (data) => {
        this.ungradedAttempts = data.results;
      },
      (error) => {
        console.error('Error fetching ungraded attempts:', error);
      }
    );
  }
}

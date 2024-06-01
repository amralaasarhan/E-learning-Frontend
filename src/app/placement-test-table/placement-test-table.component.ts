import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-placement-test-table',
  templateUrl: './placement-test-table.component.html',
  styleUrls: ['./placement-test-table.component.css']
})
export class PlacementTestTableComponent implements OnInit {
  placementTests: any[] = [];
  trackID!: number 

  constructor(private http: HttpClient, private router: Router, private route : ActivatedRoute) { }

  ngOnInit(): void {

    this.trackID = this.route.snapshot.params['trackID']
    console.log("TID " , this.trackID)
    this.loadPlacementTests();
  }

  loadPlacementTests(): void {
    console.log("Track Id = ", this.trackID)
    this.http.get<any[]>(`http://localhost:3000/project/student/track-placement-tests/${this.trackID}`)
      .subscribe(data => {
        this.placementTests = data;
        console.log("DATA = " ,data)
      });
  }

  isPending(status: string): boolean {
    return status === 'PENDING';
  }

  onSubmit(placementTestId: number): void {
    this.router.navigate(['/submitAssessment', placementTestId]);
  }
}

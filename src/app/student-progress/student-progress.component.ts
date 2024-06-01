import { Component, OnInit } from '@angular/core';
import { StudentProgressService } from './student-progress.service';
import { ActivatedRoute, Router } from '@angular/router';
interface ILOResult {
  name: string;
  totalHypotheticalGrade: number;
  studentGrade: number;
  percentage: number;
}

interface ProgressResponse {
  iloResults: { [key: string]: ILOResult };
  totalProgress: number;
}

@Component({
  selector: 'app-student-progress',
  templateUrl: './student-progress.component.html',
  styleUrls: ['./student-progress.component.css']
})
export class StudentProgressComponent implements OnInit {
  progressData: ProgressResponse | null = null;
  constructor(private studentProgressService: StudentProgressService, private route: ActivatedRoute  ) {}
  ngOnInit(): void {
    const courseIDParam = this.route.snapshot.paramMap.get('courseID');
    if (courseIDParam) {
      const courseID = Number(courseIDParam);
      if (!isNaN(courseID)) {
        this.studentProgressService.getProgress(courseID).subscribe(
          (data) => {
            this.progressData = data;
          },
          (error) => {
            console.error('Error fetching progress data:', error);
          }
        );
      } else {
        console.error('Invalid course ID');
      }
    } else {
      console.error('Course ID not found in route');
    }
  }
}
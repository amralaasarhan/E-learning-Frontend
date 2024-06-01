import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback-analysis',
  templateUrl: './feedback-analysis.component.html',
  styleUrls: ['./feedback-analysis.component.css']
})
export class FeedbackAnalysisComponent implements OnInit {
  feedbackData: any;
  surveyID!: number;

  constructor(
    private route: ActivatedRoute,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    const surveyIDParam = this.route.snapshot.paramMap.get('surveyID');
    if (surveyIDParam) {
      this.surveyID = +surveyIDParam; // Convert the string to a number
      this.feedbackService.getFeedbackAnalysis(this.surveyID).subscribe(data => {
        this.feedbackData = data;
      });
    } else {
      console.error('surveyID is null');
    }
  }
}
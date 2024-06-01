// portfolio.component.ts

import { Component } from '@angular/core';
import { PortfolioService } from './porfolio.service'

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  educationDegree: string = '';
  academicInstitute: string = '';
  technicalSkills: string = '';
  description: string = '';
  experience: string = '';

  constructor(private portfolioService: PortfolioService) { }

  addPortfolio(): void {
    const portfolioData = {
      EDUCATION_DEGREE: this.educationDegree,
      ACADEMIC_INSTITUTE: this.academicInstitute,
      TECHNICAL_SKILLS: this.technicalSkills,
      DESCRIPTION: this.description,
      EXPERIENCE: this.experience
    };

    this.portfolioService.addPortfolio(portfolioData)
      .subscribe(
        response => {
          console.log(response); // Handle successful response
        },
        error => {
          console.error(error); // Handle error response
        }
      );
  }
}

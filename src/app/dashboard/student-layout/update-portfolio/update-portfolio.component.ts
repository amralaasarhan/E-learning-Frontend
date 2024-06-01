// portfolio-update.component.ts

import { Component } from '@angular/core';
import { PortfolioService } from '../portfolio/porfolio.service'

@Component({
  selector: 'app-portfolio-update',
  templateUrl: './update-portfolio.component.html',
  styleUrls: ['./update-portfolio.component.css']
})
export class PortfolioUpdateComponent {
  educationDegree: string = '';
  academicInstitute: string = '';
  technicalSkills: string = '';
  description: string = '';
  experience: string = '';

  constructor(private portfolioService: PortfolioService) { }

  updatePortfolio(): void {
    const portfolioData = {
      EDUCATION_DEGREE: this.educationDegree,
      ACADEMIC_INSTITUTE: this.academicInstitute,
      TECHNICAL_SKILLS: this.technicalSkills,
      PORTFOLIO_DESCRIPTION: this.description,
      EXPERIENCE: this.experience
    };

    this.portfolioService.updatePortfolio(portfolioData)
      .subscribe(
        response => {
          console.log('Portfolio updated successfully:', response);
          // Handle success response
        },
        error => {
          console.error('Error updating portfolio:', error);
          // Handle error response
        }
      );
      
  }
  deletePortfolio(): void {
    this.portfolioService.deletePortfolio()
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

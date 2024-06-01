import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetPasswordService } from '../reset-password.service';

@Component({
  selector: 'app-reset-confirmation',
  templateUrl: './reset-confirmation.component.html',
  styleUrls: ['./reset-confirmation.component.css']
})
export class ResetConfirmationComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  resetSuccess: boolean = false;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resetPasswordService: ResetPasswordService
  ) {}

  ngOnInit(): void {
    // Extract token from URL
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (!this.token) {
        // Token not found in URL, redirect to error page or handle accordingly
        this.router.navigate(['/error']);
      }
    });
  }

  onSubmit(): void {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Call reset password API with token and new password
    this.resetPasswordService.resetPassword(this.token, this.newPassword).subscribe(
      response => {
        console.log('Password reset successfully:', response);
        this.resetSuccess = true;
      },
      error => {
        console.error('Error resetting password:', error);
        // Handle error
        this.errorMessage = 'An error occurred while resetting your password. Please try again.';
      }
    );
  }
}

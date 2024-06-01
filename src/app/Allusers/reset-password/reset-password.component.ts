import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router from @angular/router
import { ResetPasswordService } from './reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = ''; // Initialize email property

  constructor(private resetPasswordService: ResetPasswordService, private router: Router) {}

  onSubmit() {
    const formData = { email: this.email };
    this.resetPasswordService.sendResetPasswordEmail(formData).subscribe(
      response => {
        console.log('Reset email sent successfully:', response);
        // Redirect to new password component
        this.router.navigate(['/new-password']);
      },
      error => {
        console.error('Error sending reset email:', error);
        // Handle error
      }
    );
  }
}

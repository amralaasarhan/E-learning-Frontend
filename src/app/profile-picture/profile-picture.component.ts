import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilePictureService } from './profile-picture.service';
@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent {
  selectedFile: File | null = null;

  constructor(private router: Router, private profilePictureService: ProfilePictureService) {}

  onFileSelected(event: any) {
    // Assuming input type=file has id="fileInput"
    const input = event.target;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadProfilePicture() {
    if (this.selectedFile) {
      this.profilePictureService.uploadProfilePicture(this.selectedFile)
        .subscribe(
          (response) => {
            console.log('Image uploaded successfully:', response);
            // Handle success, e.g., show a success message
          },
          (error) => {
            console.error('Error uploading image:', error);
            // Handle error, e.g., show an error message
          }
        );
    } else {
      console.warn('No file selected');
      // Handle case where no file is selected
    }
  }
}
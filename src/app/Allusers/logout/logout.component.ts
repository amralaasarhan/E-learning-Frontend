import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../Auth/auth-service.service';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    // Call the logout method from the AuthServiceService
    this.authService.logout();
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../../../Auth/auth-service.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-message-expert',
  templateUrl: './message-expert.component.html',
  styleUrls: ['./message-expert.component.css']
})
export class MessageExpertComponent implements OnInit {
  user: any;
  showModal: boolean = false;
  messageForm: FormGroup;
  expertsData: any[] = [];
  userName:String="";
  successMessage: string = '';

  constructor(private http: HttpClient, private formBuilder: FormBuilder,private authService: AuthServiceService) {
    this.messageForm = this.formBuilder.group({
      msgTitle: ['', Validators.required],
      msgType: ['', Validators.required],
      msgBody: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.getExpertData().subscribe((data: any) => {
      this.expertsData = data;
    });
  }

  loadUserData(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        console.log(userData);
        this.user = userData[1] || userData.email;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.error('User data not found in local storage');
    }
  }

  openModal(name:String) {
    this.userName=name;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  getExpertData(): Observable<any> {
    return this.http.get<any>('http://localhost:3000/project/expert/getNames');
  }

  sendMessage() {
    const bodyData = {
      email:this.user,
      to : this.userName.toString(),
      msgTitle: this.messageForm.get('msgTitle')?.value,
      msgType: this.messageForm.get('msgType')?.value,
      msgBody: this.messageForm.get('msgBody')?.value
    };
  
      this.http.post<any>('http://localhost:3000/project/expert/sendMsg', bodyData).subscribe(
        (response: any) => {
         
            // Handle successful message sending
            console.log('Message sent successfully:', response.message);
            this.successMessage = "successfuly sent";
            this.closeModal();
        
        },
        (error) => {
          // Handle HTTP error
          console.error('Error sending message:', error);
          const errorMessage = 'An error occurred while sending the message';
        }
      );
    }
    
  }


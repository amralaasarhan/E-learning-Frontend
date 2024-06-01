import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-message-supervisor',
  templateUrl: './message-supervisor.component.html',
  styleUrls: ['./message-supervisor.component.css']
})
export class MessageSupervisorComponent implements OnInit {
  user: any;
  arr: any[] = [];
  showModal: boolean = false;
  messageForm: FormGroup;
  successMessage: string = '';
  userName: string = "";
  name: string = "";

  constructor(private http: HttpClient, private formBuilder: FormBuilder, private route: ActivatedRoute,private location: Location) {
    this.messageForm = this.formBuilder.group({
      msgTitle: ['', Validators.required],
      msgType: ['', Validators.required],
      msgBody: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getSupervisorUsername(params['supervisorID']);
    });
    this.loadUserData();
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

  getSupervisorUsername(supervisorID: number): void {
    this.http.get<any>(`http://localhost:3000/project/student/super-uname/${supervisorID}`).subscribe((data: any) => {
      this.name = data.uname;
      console.log('Supervisor username:', this.name);
      this.openModal(this.name)
    });
  }

  openModal(name: string) {
    this.userName = name;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  sendMessage() {
    const bodyData = {
      email: this.user,
      to: this.userName,
      msgTitle: this.messageForm.get('msgTitle')?.value,
      msgType: this.messageForm.get('msgType')?.value,
      msgBody: this.messageForm.get('msgBody')?.value
    };

    this.http.post<any>('http://localhost:3000/project/expert/sendMsg', bodyData).subscribe(
      (response: any) => {
        // Handle successful message sending
        console.log('Message sent successfully:', response.message);
        alert("Message Sent Message sent successfully")
        this.closeModal();
        this.location.back();

      },
      (error) => {
        // Handle HTTP error
        console.error('Error sending message:', error);
        const errorMessage = 'An error occurred while sending the message';
      }
    );
  }

}
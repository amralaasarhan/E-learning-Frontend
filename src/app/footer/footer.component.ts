import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../Allusers/messages/message.service'; // Update this path
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  messageForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService) { }

  ngOnInit(): void {
    this.messageForm = this.formBuilder.group({
      to: ['admin'],
      msgTitle: ['', Validators.required],
      msgType: ['', Validators.required],
      msgBody: ['', Validators.required]
    });
  }

  sendMessage(): void {
    if (this.messageForm.valid) {
      // Send message using your message service
      this.messageService.sendMessage(this.messageForm.value).subscribe(
        (response) => {
          console.log('Message sent successfully');
          // Handle success response if needed
        },
        (error) => {
          console.error('Error sending message:', error);
          // Handle error response if needed
        }
      );
    } else {
      // Form is invalid, display error or prevent form submission
    }
  }
}
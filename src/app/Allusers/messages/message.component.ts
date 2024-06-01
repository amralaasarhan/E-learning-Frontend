import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from './message.service';
import { Message } from './message'; // Import the Message interface

@Component({
 selector: 'app-message',
 templateUrl: './message.component.html',
 styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
 messageForm!: FormGroup;
 sentMessages: Message[] = []; // Use the Message interface
 receivedMessages: Message[] = []; // Use the Message interface

 constructor(private formBuilder: FormBuilder, private messageService: MessageService) {}

 ngOnInit() {
    this.messageForm = this.formBuilder.group({
      msgTitle: ['', Validators.required],
      msgBody: ['', Validators.required],
      to: ['', Validators.required],
      msgType: ['', Validators.required]
    });

    this.messageService.getSentMessages().subscribe(messages => {
      console.log(messages);
      this.sentMessages = messages;
      this.sortMessagesByTime(this.sentMessages); // Sort the sent messages
    });

    this.messageService.getReceivedMessages().subscribe(messages => {
      this.receivedMessages = messages;
    });
 }

 sendMessage() {
    this.messageService.sendMessage(this.messageForm.value).subscribe(response => {
      // Handle response
      // After successfully sending a message, refresh the sent messages list
      this.messageService.getSentMessages().subscribe(messages => {
        this.sentMessages = messages;
        this.sortMessagesByTime(this.sentMessages); // Sort the sent messages again
      });
    });
 }

 replyToMessage(msgID: number|null) {
    // Navigate to the same form but pre-fill the parentMsgID
    this.messageForm.controls['parentMsgID'].setValue(msgID);
 }

 // Method to sort messages by time
 sortMessagesByTime(messages: Message[]): void {
    messages.sort((a, b) => {
      // Assuming message.time is a Date object or a timestamp
      // Convert to Date if it's not already
      const timeA = new Date(a.time);
      const timeB = new Date(b.time);
      return timeB.getTime() - timeA.getTime(); // Sort in descending order
    });
 }
}
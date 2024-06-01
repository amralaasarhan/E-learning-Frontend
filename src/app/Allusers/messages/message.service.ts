import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from './message';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  constructor(private http: HttpClient) {}

  sendMessage(messageData: any): Observable<any> {
    return this.http.post<any>('http://localhost:3000/project/messages', messageData);
  }

  getSentMessages(): Observable<Message[]> {
    return this.http.get<{ sentMessages: Message[] }>('http://localhost:3000/project/sent-messages')
       .pipe(
         map(response => response.sentMessages), // Extract sentMessages array from the response
       );
   }
   

  getReceivedMessages(): Observable<Message[]> {
    return this.http.get<{ receivedMessages: Message[] }>('http://localhost:3000/project/received-messages')
       .pipe(
         map(response => response.receivedMessages), // Extract sentMessages array from the response
       );
   }
}

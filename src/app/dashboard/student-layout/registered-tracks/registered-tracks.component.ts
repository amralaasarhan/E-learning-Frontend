import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../../track/track.service';
import { Track } from '../../../track/track';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registered-tracks',
  templateUrl: './registered-tracks.component.html',
  styleUrls: ['./registered-tracks.component.css']
})
export class RegisteredTracksComponent implements OnInit {
  tracks: Track[] = [];
  user: any;

  constructor(private http: HttpClient, private router: Router, private trackService: TrackService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        console.log(userData);
        this.user = userData[1] || userData.email;
        this.getRegisteredTracks();
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.error('User data not found in local storage');
    }
  }
  
  openTrack(id: number): void {
    this.router.navigate(['./trackOverview', id]); 
  }

  openChat(name: String): void {
    this.router.navigate(['./message-supervisor', name]); 
  }


  getRegisteredTracks(): void {
    this.trackService.getRegisteredTracks()
      .subscribe(tracks => {
        this.tracks = tracks;
        console.log('Retrieved tracks:', tracks); // Add this console log statement
      });
  }

}

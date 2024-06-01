import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TrackService } from '../../../track/track.service';
import { Track } from '../../../track/track';
import { UserService } from 'src/app/user/user.service';


@Component({
  selector: 'app-supervisorTracks',
  templateUrl: './supervisorTracks.component.html',
  styleUrls: ['./supervisorTracks.component.css']
})
export class SupervisorTracksComponent implements OnInit {

  tracks: Track[] = [];
  user: any
  constructor(private router: Router, private userService: UserService, private trackService: TrackService) { }

  ngOnInit(): void {
    this.loadUserData();
    this.getAllTracksOfSupervisor();

  }

  loadUserData(): void {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      try {
        const userData = JSON.parse(userDataString);
        console.log(userData);
        this.user = userData[5] || userData.fName;
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else {
      console.error('User data not found in local storage');
    }
  }

  getAllTracksOfSupervisor(): void {
    this.trackService.getAllTracksOfSupervisor()
      .subscribe(tracks => {
        this.tracks = tracks;
        console.log('Retrieved tracks:', tracks); // Add this console log statement
      });
  }

  openTrackLayout(trackId: number): void {
    console.log("My Track Id ",trackId)
    this.router.navigate(['./track-view',trackId]);
  }
}
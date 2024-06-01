import { Component, OnInit } from '@angular/core';
import { Router , ActivatedRoute} from '@angular/router';

import { TrackService } from '../../track/track.service';
import { Track } from '../../track/track';


@Component({
  selector: 'app-tracks',
  templateUrl: './allTracks.component.html',
  styleUrls: ['./allTracks.component.css']
})
export class AllTracksComponent  implements OnInit {

  tracks: Track[] = [];

  constructor(private router: Router, private trackService: TrackService ,private route :ActivatedRoute) { }

  navigateToLogin() {
    this.router.navigate(['/signup']);
  }

  ngOnInit(): void {
    this.getAllTracks();
  }

  getAllTracks(): void {
    this.trackService.getAllTracks()
      .subscribe(tracks => this.tracks = tracks);
  }
  enrollNow(trackId: number): void {
    this.router.navigate(['/register-track', trackId]);
  }
}

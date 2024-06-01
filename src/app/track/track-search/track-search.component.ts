import { Component, OnInit } from '@angular/core';
import { TrackService } from '../../track/track.service';
import { Track } from '../../track/track';

@Component({
  selector: 'app-track-search',
  templateUrl: './track-search.component.html',
  styleUrls: ['./track-search.component.css']
})
export class TrackSearchComponent implements OnInit {
  searchQuery: string = ''; // Variable to store the search query
  tracks: Track[] = []; // Array to store search results

  constructor(private trackService: TrackService) { }

  ngOnInit(): void {
    // Optionally, you can load initial data or perform any initialization here
  }

  // Method to search for courses
  searchTrack(): void {
    if (this.searchQuery.trim()) {
      // Call the service method to search for courses
      this.trackService.searchTracksByName(this.searchQuery).subscribe(tracks => {
        this.tracks = tracks;
        console.log(this.tracks);
      });
    }
  }
}


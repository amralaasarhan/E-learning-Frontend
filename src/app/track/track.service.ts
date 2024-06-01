
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServiceService } from '../Auth/auth-service.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { tap } from 'rxjs/operators';
import { filter, take, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Course } from '../course/course';

import { Track } from './track';
@Injectable({
  providedIn: 'root'
})
export class TrackService {
  private getAllTracksPath = 'http://localhost:3000/project/tracks';
  private getAllTracksOfSupervisorPath = 'http://localhost:3000/project/supervisor/viewTracks';
  private getAllTracksOfStudentPath = 'http://localhost:3000/project/student/getRegisteredTracks';
  private searchTrackPath = 'http://localhost:3000/project';
  constructor(private http: HttpClient, private authService: AuthServiceService) { }


  getAllTracks(): Observable<Track[]> {
    return this.http.get<any>(this.getAllTracksPath).pipe(
      map(response => this.mapTracksResponse(response))
    );
  }

  getAllTracksOfSupervisor(): Observable<Track[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.get<any>(this.getAllTracksOfSupervisorPath, { headers }).pipe(
      tap(response => console.log('Response from backend:', response)),
      map(response => this.mapTracksResponse(response))
    );
  }

  getRegisteredTracks(): Observable<Track[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.get<any>(this.getAllTracksOfStudentPath, { headers }).pipe(
      tap(response => console.log('Response from backend:', response)),
      map(response => this.mapTracksResponse(response))
    );
  }

  getTrackByTitle(title: String): Observable<Track | undefined> {
    console.log(title);
    return this.getAllTracksOfSupervisor().pipe(
      map(tracks => tracks.find(track => track.title === title))
    );
  }


  getTrackById(trackId: number): Observable<Track | undefined> {
    console.log("Requested Track ID:", trackId);
    return this.getAllTracks().pipe(
      map(tracks => {
        const foundTrack = tracks.find(track => String(track.trackId).trim() === String(trackId).trim());
        return foundTrack;
      })
    );
  }
  

  getTrackByCourseId(courseId: number): Observable<Track[]> {
    return this.getAllTracksOfSupervisor().pipe(
      map(allTracks => {
        // Filter tracks by courseId
        const tracksByCourseId = allTracks.filter((track: Track) => {
          if (track.courses) {
            return track.courses.some((course: Course) => String(course.courseId).trim() === String(courseId).trim());
          }
          return false;
        });
        return tracksByCourseId;
      })
    );
  }


  mapTracksResponse(response: any): Track[] {
    if (response && response.tracks && Array.isArray(response.tracks)) {
      const mappedTracks: Track[] = response.tracks.map((trackData: any) => {
        // Check if trackImage data is provided
        const trackImage = trackData.trackImage ? `data:image/jpeg;base64,${trackData.trackImage}` : null;

        // Map courses data if available
        const courses: Course[] = trackData.courses.map((courseData: any) => {
          // Check if courseImage data is provided
          const courseImage = courseData.courseImage ? `data:image/jpeg;base64,${courseData.courseImage}` : null;

          return {
            courseId: courseData.courseId,
            courseName: courseData.courseName,
            courseLevel: courseData.courseLevel,
            courseHours: courseData.courseHours,
            courseImage: courseImage
          };
        });

        return {
          trackId: trackData.trackId,
          title: trackData.title,
          description: trackData.description,
          supervisorFk: trackData.pathSupervisorID,
          trackImage: trackImage,
          courses: courses
        };
      });
      return mappedTracks;
    } else {
      console.error('Invalid response structure:', response);
      return [];
    }
  }





  searchTracksByName(query: string): Observable<Track[]> {
    return this.http.get<any>(`${this.searchTrackPath}/searchTrack?query=${query}`).pipe(
      map(response => {
        return this.mapTracksResponse(response);
      }),
      catchError(error => {
        console.error('Error searching courses by name:', error);
        return throwError('Error searching courses by name. Please try again later.');
      })
    );
  }



}

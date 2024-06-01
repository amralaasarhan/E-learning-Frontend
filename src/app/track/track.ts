import { Course } from '../course/course';

export interface Track {
    trackId: number;
    title: string;
    description: string;
    supervisorFk: number;
    trackImage: string | null;
    courses?: Course[]; // Optional array of courses associated with the track
}
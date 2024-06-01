export interface Assessments {
    ASSESSMENT_ID: number; 
    ASSESMENT_TYPE: string;
    INSTRUCTOR_ID_FK: number;
    COURSE_ILO_ID_FK: number;
    PATH_SUPERVISOR_ID: number | null;
}

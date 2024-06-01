import { DemoQuestion } from "./questionModel";

export interface DemoAssessment
{
file: any;
    assessmentID: number;
assessmentType: string;
instructorID: number;
supervisorID: number;
courseID: number;
createdAt: Date;
deadline: Date;
name: string;
description: string;
grade: number;
questions: DemoQuestion[] | null ;
}
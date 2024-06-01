export interface DemoQuestion {
    A_QUESTION_ID: number;
    ASSESSMENT_ID_FK: number;
    QUESTION: string;
    QUESTION_LEVEL: string;
    QUESTION_TYPE: string;
    CORRECT_ANSWER: string | null;
    ANSWER_1: string | null;
    ANSWER_2: string | null;
    ANSWER_3: string | null;
    ANSWER_4: string | null;
    COURSE_ILO_ID_FK: number;
    WEIGHT: number;
}
   
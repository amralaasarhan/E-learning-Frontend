import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AssessmentService } from '../../Assessment/assessment.service';

@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.css']
})
export class AddQuestionsComponent implements OnInit {

  questionForm!: FormGroup;
  questionTypes = ['mcq', 'true or false', 'essay'];
  questionLevels = ['easy', 'medium', 'hard'];
  lastAssessmentId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private assessmentService: AssessmentService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.lastAssessmentId = +params['lastAssessmentId']; // Convert to number
      console.log('Last Assessment ID:', this.lastAssessmentId);
    });
    this.questionForm = this.formBuilder.group({
      questions: this.formBuilder.array([this.createQuestion()])
    });
    this.cdr.detectChanges();
  }

  createQuestion(): FormGroup {
    return this.formBuilder.group({
      question: ['', Validators.required],
      questionType: ['', Validators.required],
      questionLevel: ['', Validators.required],
      answers: this.formBuilder.array([]),
      correctAnswer: [],
      essayAnswer: ['']
    });
  }

  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(this.formBuilder.group({
      question: ['', Validators.required],
      questionType: ['', Validators.required],
      questionLevel: ['', Validators.required],
      answers: this.formBuilder.array([])
    }));
    this.cdr.detectChanges();
  }

  addAnswer(questionIndex: number): void {
    const question = this.getQuestionGroup(questionIndex);
    const answers = question.get('answers') as FormArray;
    answers.push(this.formBuilder.control(''));
    console.log(answers);
  }
  getAnswersArray(questionIndex: number): FormArray {
    const question = this.getQuestionGroup(questionIndex);
    return question.get('answers') as FormArray;
  }
  getQuestionGroup(index: number): FormGroup {
    return this.questions.at(index) as FormGroup;
  }


  submitQuestion(questionIndex: number): void {
    const question = this.getQuestionGroup(questionIndex).value;
    this.assessmentService.addAssessmentQuestion(+this.lastAssessmentId, question.question, question.questionType, question.questionLevel).subscribe(
      response => {
        console.log('Question added:', response);

        this.assessmentService.getAssessmentQuestionsByAssessmentId(+this.lastAssessmentId).subscribe(
          questions => {

            const assesmentQuestionId = questions[questions.length - 1].A_QUESTION_ID;
            this.addQuestion();
          },
          error => console.error('Error fetching assessment questions:', error)
        );
      },
      error => console.error('Error adding question:', error)
    );
  }

  submitAnswer(questionIndex: number): void {
    const answerText = this.getAnswersArray(questionIndex).value;
    const question = this.getQuestionGroup(questionIndex) as FormGroup;
    const correctAnswerControl = question.get('correctAnswer');
    const assessmentQuestionId = 4;
    if (correctAnswerControl) { 
      const correctAnswer = correctAnswerControl.value;


      this.assessmentService.addAnswer(assessmentQuestionId, answerText, correctAnswer).subscribe(
        answerResponse => console.log('Answer added:', answerResponse),
        error => console.error('Error adding answer:', error)
      );
    } else {
      console.error('Correct answer control not found in the form group.');
    }
  }

  onSubmit(): void {
    this.questions.controls.forEach((questionControl, index) => {
    });
    this.router.navigate(['/show-assessment-questions', this.lastAssessmentId]);

  }
}



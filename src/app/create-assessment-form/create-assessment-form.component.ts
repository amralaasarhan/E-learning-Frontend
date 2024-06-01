import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-assessment-form',
  templateUrl: './create-assessment-form.component.html',
  styleUrls: ['./create-assessment-form.component.css']
})
export class CreateAssessmentFormComponent implements OnInit {
  courseILOs: any[] = [];
  selectedILOIds: number[] = [];
  courseId!: number;
  type!: string; // Declare the type property
  file! : File 
  questions: any[] = [];
  assessmentGrade: number = 0; // Initialize with default value
  submissionILOWeights: { ILO_ID: number, WEIGHT: number }[] = [];

 
  mcqWeight: number = 1; // Default weight for MCQ questions
  trueFalseWeight: number = 1; // Default weight for True or False questions
  essayWeight: number = 1; // Default weight for Essay questions

  @ViewChild('questionForm') questionForm!: NgForm; // Declare questionForm using ViewChild


  constructor(private route: ActivatedRoute,private http: HttpClient  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = params['courseID'];
      this.fetchCourseILOs(this.courseId);
    });
  }

  fetchCourseILOs(courseId: number): void {
    const endpoint = `http://localhost:3000/project/supervisor/getCourseIlo/${courseId}`;
    this.http.get(endpoint).subscribe(
      (response: any) => {
        if (response.status === 'OK') {
          this.courseILOs = response.courseIloDetails;
        } else {
          // Handle error
          console.error('Failed to fetch course ILOs:', response.error);
        }
      },
      (error: any) => {
        // Handle HTTP error
        console.error('HTTP Error:', error);
      }
    );
  }
  

  onCheckboxChange(event: any, courseId: number): void {
    if (event.target.checked) {
      this.selectedILOIds.push(courseId);
      console.log(this.selectedILOIds)
    } else {
      const index = this.selectedILOIds.indexOf(courseId);
      if (index !== -1) {
        this.selectedILOIds.splice(index, 1);
      }
    }
  }
  onFileSelected(event: any): void {
    this.file= event.target.files[0];
    console.log(this.file)
    if (this.file) {
      // You can access file properties such as name, size, type, etc.
      console.log('Selected File:', this.file.name);
      // You can also upload the file to the server or process it further.
    }
  }
  
  onTypeChange(event: any): void {
    this.type = event;
  }

  addQuestion(): void {
    // No need to handle question type, answers, or correctAnswer here
    // This method should only add the HTML for adding another question
    this.questions.push({});
  }

  removeQuestion(index: number): void {
    this.questions.splice(index, 1);
  }

  submitForm(assessmentForm: NgForm): void {
    // Check if the form is valid
    if (!assessmentForm.form.valid) {
      console.log('Form is not valid.');
      return;
    }
  
    // Add all questions to the questions array
    this.questions = this.questions.map((question) => {
      let weight = 0; // Default weight

  // Determine weight based on question type
  switch (question.QUESTION_TYPE) {
    case 'MCQ':
      weight = this.mcqWeight;
      break;
    case 'TrueFalse':
      weight = this.trueFalseWeight;
      break;
    case 'Essay':
      weight = this.essayWeight;
      break;
    default:
      break;
  }
      return {
        QUESTION_TEXT: question.QUESTION_TEXT || null,
        QUESTION_LEVEL: question.QUESTION_LEVEL || null,
        COURSE_ILO_ID: question.COURSE_ILO_ID || null,
        QUESTION_TYPE: question.QUESTION_TYPE || null,
        ANSWER_1: question.ANSWER_1 || null,
        ANSWER_2: question.ANSWER_2 || null,
        ANSWER_3: question.ANSWER_3 || null,
        ANSWER_4: question.ANSWER_4 || null,
        CORRECT_ANSWER: question.CORRECT_ANSWER || null,
        weight:weight
        
      };
    });
  
   
    const formData = new FormData();
    formData.append('name', assessmentForm.value.name);
    formData.append('description', assessmentForm.value.description);
    formData.append('grade', this.assessmentGrade.toString());
    formData.append('deadline', assessmentForm.value.deadline);
    formData.append('selectedILOIds', JSON.stringify(this.selectedILOIds));
    formData.append('type', this.type);
    formData.append('questions', JSON.stringify(this.questions));
    if (this.file) {
       formData.append('file', this.file);
    }
    console.log(this.submissionILOWeights)
    // Submit the form data
    this.http.post(`http://localhost:3000/project/supervisor/createAss/${this.courseId}`, formData)
    .subscribe(
      (response) => {
        alert('Form submitted successfully:'+ response);
        // Here you can perform further actions if needed
      },
      (error) => {
        alert('Error submitting form:'+ error);
        // Handle error if needed
      }
    );
  
    // Here you can perform further actions like sending the form data to a server
  }
  getILOWeight(courseILOId: number): number {
    const iloWeight = this.submissionILOWeights.find(ilo => ilo.ILO_ID === courseILOId);
    return iloWeight ? iloWeight.WEIGHT : 0;
  }
  
  isFormValid(): boolean {
    var flag: boolean = true;
    for( const question of this.questions)
      {
        if((question.QUESTION_TYPE==='MCQ' && (question.CORRECT_ANSWER==null||question.ANSWER_1==null||question.ANSWER_2==null||question.ANSWER_3==null||question.ANSWER_4==null))
          ||(question.QUESTION_TYPE==='TrueFalse' && question.CORRECT_ANSWER==null)
          ||(question.QUESTION_TEXT==null)
           ||(question.COURSE_ILO_ID==null)
          ||(question.QUESTION_TYPE==null)
        || (this.questions.length==0))
          { flag=false;}

      }
      
  
    // const trueFalseQuestionsHaveAnswer = this.questions.every(question => {
    //   return question.QUESTION_TYPE === 'TrueFalse' && question.CORRECT_ANSWER != null;
    // });
  
    return flag }

    
  
}


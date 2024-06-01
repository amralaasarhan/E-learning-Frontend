import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Home
import { HomeComponent } from './home/home.component';


//All users functions
import { LoginComponent } from './Allusers/login/login.component';
import { SignupComponent } from './Allusers/signup/signup.component';
import { AllCoursesComponent } from './Allusers/Allcourses/allCourses.component';
import { AllTracksComponent } from './Allusers/Alltracks/allTracks.component';
import { DeleteUserComponent } from './Allusers/delete-user/delete-user.component';
import { MessageComponent } from './Allusers/messages/message.component';
import { LogoutComponent } from './Allusers/logout/logout.component';
import { CourseSearchComponent } from './course/course-search/course-search.component';
import { TrackSearchComponent } from './track/track-search/track-search.component';
import { ResetPasswordComponent } from './Allusers/reset-password/reset-password.component';
import { ResetConfirmationComponent } from './Allusers/reset-password/reset-confirmation/reset-confirmation.component';
import { UpdateProfileComponent } from './dashboard/update-profile/update-profile.component';





//Dashboards of users
import { ExpertLayoutComponent } from './dashboard/expert-layout/expert-layout.component';
import { CompanyRepresentativeLayoutComponent } from './dashboard/companyRepresentative-layout/companyRepresentative-layout.component';
import { InstructorLayoutComponent } from './dashboard/instructor-layout/instructor-layout.component';
import { PSupervisorLayoutComponent } from './dashboard/p-supervisor-layout/p-supervisor-layout.component';
import { StudentLayoutComponent } from './dashboard/student-layout/student-layout.component';
import { AdminLayoutComponent } from './dashboard/admin-layout/admin-layout.component';

//Profile Picture
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';

//Student Function
import { PortfolioComponent } from './dashboard/student-layout/portfolio/portfolio.component';
import { MessageExpertComponent } from './dashboard/student-layout/message-expert/message-expert.component';
import { MessageSupervisorComponent } from './dashboard/student-layout/message-supervisor/message-supervisor.component';
import { RegisteredCoursesComponent } from './dashboard/student-layout/registered-courses/registered-courses.component';
import { RegisteredTracksComponent } from './dashboard/student-layout/registered-tracks/registered-tracks.component';
import { SubmissionComponent } from './dashboard/student-layout/submission/submission.component';
import { TrackOverviewComponent } from './dashboard/student-layout/track-overview/track-overview.component';

//Supervisor Function
import { SupervisorTracksComponent } from './dashboard/p-supervisor-layout/SupervisorTracks/supervisorTracks.component';
import { SupervisorCoursesComponent } from "../app/dashboard/p-supervisor-layout/SupervisorCourses/SupervisorCourses.component"
import { CourseLayoutComponent } from '../app/dashboard/course-layout/course-layout.component';
import { PortfolioUpdateComponent } from './dashboard/student-layout/update-portfolio/update-portfolio.component'
import { CourseViewComponent } from './course-view/course-view.component';

import { TrackViewComponent } from './track-view/track-view.component'
import { ViewSubmissionsComponent } from './view-submissions/view-submissions.component';

import { AddQuestionsComponent } from './Assessments/add-questions/add-questions.component';
import { AssessmentDetailsComponent } from './Assessments/assessment-details/assessment-details.component';
import { AddQuestionsFromQbComponent } from './Assessments/add-questions-from-qb/add-questions-from-qb.component';
import { ShowAssessmentQuestionsComponent } from './Assessments/show-assessment-questions/show-assessment-questions.component';
import { ViewAllAssessmentsComponent } from './Assessments/view-all-assessments/view-all-assessments.component';
import { SurveyFeedbackComponent } from './survey/survey-feedback/survey-feedback.component';
import { SurveyFormComponent } from './survey/survey-form/survey-form.component';


import { CreateAssessmentFormComponent } from './create-assessment-form/create-assessment-form.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { UngradedAttemptsComponent } from './ungraded-attempts/ungraded-attempts.component';
import { GradeAttemptComponent } from './grade-attempt/grade-attempt.component';
import { ViewGradesComponent } from './view-grades/view-grades.component';
import { TrackRegistrationComponent } from './track-registration/track-registration.component';
import { PlacementTestTableComponent } from './placement-test-table/placement-test-table.component';

import { StudentProgressComponent } from './student-progress/student-progress.component';
import { FeedbackAnalysisComponent } from './feedback-analysis/feedback-analysis.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'logout',
    component: LogoutComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'AllCourses',
    component: AllCoursesComponent
  },
  {
    path: 'AllTracks',
    component: AllTracksComponent
  },
  {
    path: 'supervisor-dashboard',
    component: PSupervisorLayoutComponent
  },
  {
    path: 'student-dashboard',
    component: StudentLayoutComponent
  },
  {
    path: 'delete-user',
    component: DeleteUserComponent
  },
  {
    path: 'instructor-dashboard',
    component: InstructorLayoutComponent
  },
  {
    path: 'expert-dashboard',
    component: ExpertLayoutComponent
  },
  {
    path: 'companyRepresentative-dashboard',
    component: CompanyRepresentativeLayoutComponent
  },
  {
    path: 'supervisorTracks', component: SupervisorTracksComponent

  },

  {
    path: 'updateProfile', component: UpdateProfileComponent

  },
  {
    path: 'updateProfile', component: UpdateProfileComponent

  },
  {
    path: 'messages', component: MessageComponent

  },
  {
    path: 'courseLayout/:trackId/:courseName', component: CourseLayoutComponent

  },
  {
    path: 'courseLayout/:courseName', component: CourseLayoutComponent

  },
  {
    path: 'course-view/:trackId/:courseID', component: CourseViewComponent
  },
  {
    path: 'course/:courseID', component: CourseViewComponent
  },
  {
    path: 'track-view/:trackId', component: TrackViewComponent
  },
  {
    path: 'supervisorCourses', component: SupervisorCoursesComponent

  },
  {
    path: 'admin-dashboard', component: AdminLayoutComponent

  },
  {
    path: 'messageExpert', component: MessageExpertComponent

  },

  {
    path: 'message-supervisor/:username', component: MessageSupervisorComponent

  },
  {
    path: 'viewSubmissions/:courseTopicID', component: ViewSubmissionsComponent
  },
  {
    path: 'create-Assessment/:courseID', component: CreateAssessmentFormComponent
  },
  {
    path: 'submitAssessment/:assessmentID', component: AssessmentFormComponent

  },
  {
    path: 'ungraded-attempts/:courseID', component: UngradedAttemptsComponent
  },
  {
    path: 'grade-attempt/:attemptID', component: GradeAttemptComponent
  },
  {
    path: 'view-grades/:courseID', component: ViewGradesComponent
  },
  {
    path: 'searchCourse', component: CourseSearchComponent
  },
  {
    path: 'searchTrack', component: TrackSearchComponent
  },
  {
    path: 'forgot-password', component: ResetPasswordComponent
  },
  {
    path: 'reset-password', component: ResetConfirmationComponent
  },
  {
    path: 'portfolio', component: PortfolioComponent
  },
  {
    path: 'updatePortfolio', component: PortfolioUpdateComponent
  },
  {
    path: 'add-questions/:lastAssessmentId', component: AddQuestionsComponent
  },
  {
    path: 'assessment-details', component: AssessmentDetailsComponent
  },
  {
    path: 'add-questions-from-qb', component: AddQuestionsFromQbComponent
  },
  {
    path: 'show-assessment-questions/:lastAssessmentId', component: ShowAssessmentQuestionsComponent
  },
  {
    path: 'view-all-assessments', component: ViewAllAssessmentsComponent
  },
  {
    path: 'submitSurvey/:surveyID', component: SurveyFeedbackComponent
  },
  {
    path: 'createSurvey/:surveyID', component: SurveyFormComponent
  },
  {
    path: 'RegisteredTracks', component: RegisteredTracksComponent
  },
  { path: 'trackOverview/:trackId', component: TrackOverviewComponent },

  {
    path: 'RegisteredCourses', component: RegisteredCoursesComponent
  },
  {
    path: 'submission', component: SubmissionComponent
  },
  {
    path:'register-track/:trackId' , component: TrackRegistrationComponent
  },
  {
    path:'placement-tests/:trackID', component:PlacementTestTableComponent
  },
  {
    path:'view-progress/:courseID', component:StudentProgressComponent
  },
  {
    path:'feedback-results/:surveyID' , component:FeedbackAnalysisComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { AppComponent } from './app.component';
import { AuthInterceptor } from './Auth/auth.interceptor';
import { AuthServiceService } from './Auth/auth-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

//Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { TrackViewModule } from '../app/track-view/track-view.Module';
import { CourseLayoutModule } from '../app/dashboard/course-layout/course-layout.Module';
import { SurveyFeedbackModule } from './survey/survey-feedback/survey-feedback.Module';
import { FilterBySelectedILOsPipe } from './create-assessment-form/filter-by-selected-ilos.pipe';

//Home , footer , header , nav
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

//All users functions
import { LoginComponent } from './Allusers/login/login.component';
import { SignupComponent } from './Allusers/signup/signup.component';
import { UpdateProfileComponent } from './dashboard/update-profile/update-profile.component';
import { ResetPasswordComponent } from './Allusers/reset-password/reset-password.component';
import { ResetConfirmationComponent } from './Allusers/reset-password/reset-confirmation/reset-confirmation.component';
import { DeleteUserComponent } from './Allusers/delete-user/delete-user.component';
import { MessageComponent } from './Allusers/messages/message.component';
import { LogoutComponent } from './Allusers/logout/logout.component';
import { AllCoursesComponent } from './Allusers/Allcourses/allCourses.component';
import { CourseSearchComponent } from './course/course-search/course-search.component';
import { AllTracksComponent } from './Allusers/Alltracks/allTracks.component';
import { TrackSearchComponent } from './track/track-search/track-search.component';


import { SurveyFormComponent } from './survey/survey-form/survey-form.component';

//Dashboards of users
import { AdminLayoutComponent } from './dashboard/admin-layout/admin-layout.component';
import { ExpertLayoutComponent } from './dashboard/expert-layout/expert-layout.component';
import { StudentLayoutComponent } from './dashboard/student-layout/student-layout.component';
import { InstructorLayoutComponent } from './dashboard/instructor-layout/instructor-layout.component';
import { PSupervisorLayoutComponent } from './dashboard/p-supervisor-layout/p-supervisor-layout.component';
import { CompanyRepresentativeLayoutComponent } from './dashboard/companyRepresentative-layout/companyRepresentative-layout.component';

//Profile Picture
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';


import { CourseViewModule } from './course-view/course-view.Module';

//Student Function
import { PortfolioComponent } from './dashboard/student-layout/portfolio/portfolio.component';
import { MessageExpertComponent } from './dashboard/student-layout/message-expert/message-expert.component';
import { MessageSupervisorComponent } from './dashboard/student-layout/message-supervisor/message-supervisor.component';
import { PortfolioUpdateComponent } from './dashboard/student-layout/update-portfolio/update-portfolio.component'
import { RegisteredCoursesComponent } from './dashboard/student-layout/registered-courses/registered-courses.component';
import { RegisteredTracksComponent } from './dashboard/student-layout/registered-tracks/registered-tracks.component';
import { SubmissionComponent } from './dashboard/student-layout/submission/submission.component';
import { TrackOverviewComponent } from './dashboard/student-layout/track-overview/track-overview.component';

import { ViewSubmissionsComponent } from './view-submissions/view-submissions.component';
//Supervisor Function
import { SupervisorTracksComponent } from './dashboard/p-supervisor-layout/SupervisorTracks/supervisorTracks.component';
import { SupervisorCoursesComponent } from "../app/dashboard/p-supervisor-layout/SupervisorCourses/SupervisorCourses.component"

import { AddQuestionsComponent } from './Assessments/add-questions/add-questions.component';
import { AssessmentDetailsComponent } from './Assessments/assessment-details/assessment-details.component';
import { AddQuestionsFromQbComponent } from './Assessments/add-questions-from-qb/add-questions-from-qb.component';
import { ShowAssessmentQuestionsComponent } from './Assessments/show-assessment-questions/show-assessment-questions.component';
import { ViewAllAssessmentsComponent } from './Assessments/view-all-assessments/view-all-assessments.component';


import { CreateAssessmentFormComponent } from './create-assessment-form/create-assessment-form.component';
import { AssessmentFormComponent } from './assessment-form/assessment-form.component';
import { UngradedAttemptsComponent } from './ungraded-attempts/ungraded-attempts.component';
import { GradeAttemptComponent } from './grade-attempt/grade-attempt.component';
import { ViewGradesComponent } from './view-grades/view-grades.component';
import { TrackRegistrationComponent } from './track-registration/track-registration.component';
import { PlacementTestTableComponent } from './placement-test-table/placement-test-table.component';
import { StudentProgressComponent } from './student-progress/student-progress.component';
import { FeedbackAnalysisComponent } from './feedback-analysis/feedback-analysis.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    ResetPasswordComponent,
    ResetConfirmationComponent,
    PSupervisorLayoutComponent,
    StudentLayoutComponent,
    DeleteUserComponent,
    InstructorLayoutComponent,
    ExpertLayoutComponent,
    CompanyRepresentativeLayoutComponent,
    SupervisorTracksComponent,
    UpdateProfileComponent,
    LogoutComponent,
    MessageComponent,
    SupervisorCoursesComponent,
    AdminLayoutComponent,
    MessageExpertComponent,
    MessageSupervisorComponent,
    CourseSearchComponent,
    PortfolioComponent,
    TrackSearchComponent,
    PortfolioUpdateComponent,
    AllCoursesComponent,
    AllTracksComponent,
    AddQuestionsComponent,
    AssessmentDetailsComponent,
    AddQuestionsFromQbComponent,
    ShowAssessmentQuestionsComponent,
    ViewAllAssessmentsComponent,
    RegisteredTracksComponent,
    RegisteredCoursesComponent,
    TrackOverviewComponent,
    SubmissionComponent,
    SurveyFormComponent,
    ViewSubmissionsComponent,
    CreateAssessmentFormComponent,
    AssessmentFormComponent,
    FilterBySelectedILOsPipe,
    UngradedAttemptsComponent,
    GradeAttemptComponent,
    ViewGradesComponent,
    TrackRegistrationComponent,
    PlacementTestTableComponent,
    StudentProgressComponent,
    FeedbackAnalysisComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TrackViewModule,
    CourseViewModule,
    CourseLayoutModule,
    SurveyFeedbackModule,
  ],
  providers: [
    AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

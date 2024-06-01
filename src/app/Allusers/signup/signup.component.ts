import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {


  fName: string = '';
  lName: string = '';
  email: string = '';
  username: string = '';
  pass: string = '';
  mobile: string = '';
  date: Date = new Date();
  userType: string = '';
  specialization: string ='';
  companyName: string = '';

  constructor(private router: Router, private http: HttpClient) { }

  signup() {
    let bodyData = {
      fName: this.fName,
      lName: this.lName,
      email: this.email,
      username: this.username,
      pass: this.pass,
      mobile: this.mobile,
      date: this.date,
      userType: this.userType,
      specialization: this.userType === 'expert' ? this.specialization : 'null',
      companyName: this.userType === 'company_representative' ? this.companyName : 'null'
    };
    this.http.post('http://localhost:3000/project/signup', bodyData).subscribe((resultData: any) => {
      console.log(resultData);
      if (resultData.status) {
        this.router.navigate(['/login']);
      } else {
        alert("Error signing up");
        console.log("Error signing up");
      }
    });
  }

  onUserTypeChange() {
    if (this.userType !== 'company_representative') {
      this.companyName = ''; 
    }
    if (this.userType !== 'expert') {
      this.specialization = ''; 
    }
  }



}

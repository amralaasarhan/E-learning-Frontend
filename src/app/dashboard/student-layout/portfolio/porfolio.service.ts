// portfolio.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private baseUrl = 'http://localhost:3000/project/student';

  constructor(private http: HttpClient) { }

  addPortfolio(portfolioData: any): Observable<any> {
    const url = `${this.baseUrl}/portfolio`;
    return this.http.post<any>(url, portfolioData);
  }

  updatePortfolio(portfolioData: any): Observable<any> {
    const url = `${this.baseUrl}/editPortfolio`;
    return this.http.put<any>(url, portfolioData);
  }


  deletePortfolio(): Observable<any> {
    const url = `${this.baseUrl}/deletePortfolio`;
    return this.http.delete<any>(url);
  }


}

import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HerokuProvider {
  basepath = "/devops-plan-api"
  
  constructor(
    private http: Http,
    public httpClient: HttpClient,
    private _platform: Platform
  ) {
    if (this._platform.is("cordova")) {
      this.basepath = "https://devops-plan.herokuapp.com";
    }
  }

  //============== GET ============== INÍCIO ==============

  // Endpoints QUESTIONS
  FindQuestionById(id) {
    var url = `${this.basepath}/questions/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  FindAllQuestion() {
    var url = `${this.basepath}/questions`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


  // Endpoints ANSWERS
  FindAnswersById(id) {
    var url = `${this.basepath}/answers/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  FindAllAnswers() {
    var url = `${this.basepath}/answers`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }


  // Endpoints ACTIONS
  FindActionById(id) {
    var url = `${this.basepath}/actions/${id}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  FindAllActions() {
    var url = `${this.basepath}/actions`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

  //============== GET ============== FIM ==============


  //============== POST ============== INÍCIO ==============

  CreatedAnswers(data) {
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    var myData = JSON.stringify({
      description: data.description,
      action: data.action,
      questionId: data.questionId,
      nextQuestionId: data.nextQuestionId
    });
    console.log(myData);
    return this.httpClient.post(this.basepath + '/answers', myData, { headers: headers });
  }

  //============== POST ============== FIM ==============


  //============== DELETE ============== INÍCIO ==============

  DeleteQuestion(id) {
    var url = `${this.basepath}/questions/${id}`;
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    return this.httpClient.delete(url, { headers: headers });
  }

  DeleteAnswers(id) {
    var url = `${this.basepath}/answers/${id}`;
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    return this.httpClient.delete(url, { headers: headers });
  }

  DeleteAction(id) {
    var url = `${this.basepath}/actions/${id}`;
    var headers = new HttpHeaders('Content-Type:application/json; charset=UTF-8');
    return this.httpClient.delete(url, { headers: headers });
  }

  //============== DELETE ============== FIM ==============

}
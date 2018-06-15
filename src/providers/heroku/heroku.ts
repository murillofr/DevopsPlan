import { Platform } from 'ionic-angular';
import { Injectable } from "@angular/core";
import { Http } from '@angular/http';
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';

@Injectable()
export class HerokuProvider {
  basepath = "/vainorachaapi"
  
  constructor(
    private http: Http,
    public httpClient: HttpClient,
    private _platform: Platform
  ) {
    if (this._platform.is("cordova")) {
      this.basepath = "https://vainoracha.herokuapp.com";
    }
  }

  pesquisarAssuntos(texto) {
    var url = `${this.basepath}/quadras/quadra?nome=${texto}`;
    var response = this.http.get(url).map(res => res.json());
    return response;
  }

}
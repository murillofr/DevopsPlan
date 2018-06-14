import { Component } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { HerokuProvider } from './../../providers/heroku/heroku';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HerokuProvider]
})
export class HomePage {
  private assuntosEncontrados: Array<any>;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private herokuProvider: HerokuProvider) {

  }
  
  pesquisarAssuntos(assuntoBuscado) {
    let loading = this.loadingCtrl.create({
      content: 'Buscando assuntos...',
    });
    loading.present();
  
    this.herokuProvider.pesquisarAssuntos(assuntoBuscado).subscribe(
      data => {
        this.assuntosEncontrados = data;
        console.log(data);
      },
      err => {
        console.log(err);
      },
      () => {
        loading.dismiss();
        // loading.dismiss().then(() => { this.myInput.setFocus(); });
        console.log('Assunto(s) encontrado(s)');
      }
    );
  }

  onInput(assuntoBuscado) {
    if (assuntoBuscado == "") {
      document.getElementById("badge").style.visibility = "hidden";
    }else {
      document.getElementById("badge").style.visibility = "visible";
    }
    this.exibirToast("Você pesquisou: " + assuntoBuscado);
  }

  exibirToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }
  
}
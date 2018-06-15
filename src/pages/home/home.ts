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
  private assuntos: Array<any>;
  showList: boolean = false;
  assuntoBuscado: string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private herokuProvider: HerokuProvider) {
      this.initializeItems();
  }

  initializeItems() {
    this.assuntos = [
      'Amsterdam',
      'Berlin',
      'Bueno Aires',
      'Madrid',
      'Paris'
    ];
  }
  
  getAssuntos(ev: any) {
    // Reseta a variável
    this.initializeItems();

    // Seta na variável o valor digitado na searchbar
    let val = ev.target.value;

    // Se o valor não for vazio, filtra os assuntos
    if (val && val.trim() != '') {
      
      // Filtra os assuntos
      this.assuntos = this.assuntos.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

      // Verifica se não retornou nenhum assunto, se não, add msg padrão
      if (this.assuntos.length == 0) {
        this.assuntos.push("Nenhum assunto encontrado");
        this.controlarBadge(this.assuntos.length, "Nenhum assunto encontrado");
      }else {
        this.controlarBadge(this.assuntos.length, "");
      }
      
    } else {
      this.controlarBadge(0, "");
    }
  }

  setAssunto(assunto) {
    this.assuntoBuscado = assunto;
    this.controlarBadge(0, "");
  }

  controlarBadge(num, assunto) {
    if (num > 0) {
      document.getElementById("badge").textContent = num;
      document.getElementById("badge").style.visibility = "visible";
      document.getElementById("btIniciar").style.visibility = "hidden";
      this.showList = true;
    }else {
      document.getElementById("badge").textContent = "0";
      document.getElementById("badge").style.visibility = "hidden";
      document.getElementById("btIniciar").style.visibility = "visible";
      this.showList = false;
    }
  }
  
  pesquisarAssuntos(assuntoBuscado) {
    let loading = this.loadingCtrl.create({
      content: 'Buscando assuntos...',
    });
    loading.present();
  
    this.herokuProvider.pesquisarAssuntos(assuntoBuscado).subscribe(
      data => {
        this.assuntos = data;
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

  exibirToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }
  
}
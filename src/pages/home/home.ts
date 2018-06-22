import { Component, ViewChild } from '@angular/core';
import {
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { HerokuProvider } from './../../providers/heroku/heroku';
import { QuestionsPage } from '../questions/questions';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HerokuProvider]
})
export class HomePage {
  private assuntos: Array<any>;
  private nextQuestion: Array<any>;
  private currentQuestionId = 1;

  showList: boolean = false;
  assuntoBuscado: string = '';
  controleBotao: boolean = false;
  @ViewChild('searchBar') myInput;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private herokuProvider: HerokuProvider) {
      this.inicializarAssuntos();
  }

  inicializarAssuntos() {
    this.assuntos = [
      'Amsterdam',
      'Berlin',
      'Bueno Aires',
      'Madrid',
      'Paris'
    ];
  }

  ionViewWillEnter() {
    this.assuntoBuscado = "";
    this.controleBotao = false;
  }

  ionViewDidEnter() {
    setTimeout(() => {
      this.myInput.setFocus();
    }, 50);
  }
  
  getAssuntos(assunto) {
    // Reseta a variável
    this.inicializarAssuntos();

    // Se o valor não for vazio, filtra os assuntos
    if (this.assuntoBuscado && this.assuntoBuscado.trim() != '') {
      
      // Filtra os assuntos
      this.assuntos = this.assuntos.filter((item) => {
        return (item.toLowerCase().indexOf(this.assuntoBuscado.toLowerCase()) > -1);
      });

      // Verifica se não retornou nenhum assunto, se não, add msg padrão
      if (this.assuntos.length == 0) {
        this.assuntos.push("Nenhum assunto encontrado");
        this.controlarBadge(this.assuntos.length, "Nenhum assunto encontrado");
        this.controleBotao = false;
      }else {
        this.controlarBadge(this.assuntos.length, "");
      }
      
    } else {
      this.controlarBadge(0, "");
      this.controleBotao = false;
    }
  }

  setAssunto(assunto) {
    if (assunto !== "Nenhum assunto encontrado") {
      this.assuntoBuscado = assunto;
      this.controlarBadge(0, "");
      this.controleBotao = true;
    }
  }

  controlarBadge(num, assunto) {
    if (num > 0) {
      if (assunto !== "") {
        document.getElementById("badge").textContent = "0";
      }else {
        document.getElementById("badge").textContent = num;
      }
      document.getElementById("badge").style.visibility = "visible";
      this.showList = true;
    }else {
      document.getElementById("badge").textContent = "0";
      document.getElementById("badge").style.visibility = "hidden";
      this.showList = false;
    }
  }

  getQuestion() {
    if (this.assuntoBuscado !== "") {
      let loading = this.loadingCtrl.create({
        content: 'Buscando question...',
      });
      loading.present();
    
      this.herokuProvider.FindQuestionById(this.currentQuestionId).subscribe(
        data => {
          this.nextQuestion = data;
          console.log(data);
        },
        err => {
          console.log(err);
          loading.dismiss().then(() => { this.myInput.setFocus(); });
          this.exibirToast("Erro ao buscar a question.\nTente novamente.");
        },
        () => {
          loading.dismiss().then(() => { this.myInput.setFocus(); });
          console.log('Question encontrada');
          this.pushPageQuestions();
        }
      );
    }
  }

  pushPageQuestions(): void {
    this.navCtrl.push(QuestionsPage, {
      nextQuestion: this.nextQuestion,
      nextQuestionId: this.currentQuestionId,
      assuntoDescription: this.assuntoBuscado
    });
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
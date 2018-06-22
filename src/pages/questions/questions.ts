import { AppModule } from '../../app/app.module';
import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams,
  LoadingController,
  ToastController
} from 'ionic-angular';
import { HerokuProvider } from './../../providers/heroku/heroku';

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
  providers: [HerokuProvider]
})
export class QuestionsPage {
  private currentQuestion = this.navParams.data.nextQuestion;
  private currentQuestionId = this.navParams.data.nextQuestionId;
  private assuntoDescription = this.navParams.data.assuntoDescription;

  private currentAnswer: Array<any>;
  private respostaSelecionadaId: any;
  private nextQuestion: Array<any>;
  private nextQuestionId: any;

  private acabou: boolean = false;
  public finalAction: Array<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private herokuProvider: HerokuProvider) {

      // Seta o array das respostas correntes
      this.currentAnswer = this.currentQuestion.answer;
      
      // Verifica se acabaram as perguntas
      if (this.currentAnswer.length == 0) {
        this.acabou = true;
        this.finalAction = AppModule.newAction;
      }
  }
  
  ionViewWillUnload() {
    if (AppModule.backupAction !== undefined) {
      //Limpa o array NEW para preenchê-lo com o array BACKUP
      AppModule.newAction = [];
      for (let i = 0; i < AppModule.backupAction.length; i++) {
        AppModule.newAction.push(AppModule.backupAction[i]);
      }
      //Limpa o array BACKUP
      AppModule.backupAction = [];
    }
  }

  setarResposta(id, nextQuestionId) {
    this.respostaSelecionadaId = id;
    this.nextQuestionId = nextQuestionId;
  }

  getQuestion() {
    let loading = this.loadingCtrl.create({
      content: 'Buscando question...',
    });
    loading.present();
  
    this.herokuProvider.FindQuestionById(this.nextQuestionId).subscribe(
      data => {
        this.nextQuestion = data;
        console.log(data);
      },
      err => {
        console.log(err);
        loading.dismiss();
        this.exibirToast("Erro ao buscar a question.\nTente novamente.");
      },
      () => {
        loading.dismiss();
        console.log('Question encontrada');
        this.pushPageQuestions();
      }
    );
  }

  pushPageQuestions(): void {
    AppModule.oldAction = this.currentAnswer.filter((item) => {
      return (item.id.indexOf(this.respostaSelecionadaId) > -1);
    });
    AppModule.oldAction = AppModule.oldAction[0].action;

    if (AppModule.newAction == undefined) {
      AppModule.newAction = [];
      AppModule.backupAction = [];
    }

    // Add no array NEW as actions
    for (let i = 0; i < AppModule.newAction.length; i++) {
      AppModule.backupAction.push(AppModule.newAction[i]);
    }

    for (let i = 0; i < AppModule.oldAction.length; i++) {
      AppModule.newAction.push(AppModule.oldAction[i]);
    }

    this.navCtrl.push(QuestionsPage, {
      nextQuestion: this.nextQuestion,
      nextQuestionId: this.nextQuestionId,
      assuntoDescription: this.assuntoDescription
    });
  }

  pushRoot() {
    this.navCtrl.popToRoot();
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
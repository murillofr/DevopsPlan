import { AppModule } from '../../app/app.module';
import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams,
  ToastController 
} from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html',
})
export class QuestionsPage {
  private assuntoId = this.navParams.data.assuntoId;
  private assuntoDescription = this.navParams.data.assuntoDescription;
  private payloadFindAllQuestion: Array<any>;
  private currentQuestion: Array<any>;
  private currentAnswer: Array<any>;
  private respostaSelecionada: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController) {

      this.initializeItems();

      // Filtra a question com base no Id passado
      this.currentQuestion = this.payloadFindAllQuestion.filter((item) => {
        return (item.id.indexOf(this.assuntoId) > -1);
      });

      // Seta o array das respostas correntes
      this.currentAnswer = this.currentQuestion[0].answer;
  }

  initializeItems() {
    this.payloadFindAllQuestion = [
      {
        "id": "1",
        "description": "question1",
        "answer": [
          {
            "id": "11",
            "description": "answer1",
            "action": [
              {
                "id": "5",
                "description": "action1",
                "answerId": "11"
              },
              {
                "id": "6",
                "description": "action2",
                "answerId": "11"
              }
            ],
            "questionId": "1",
            "nextQuestionId": "2"
          },
          {
            "id": "12",
            "description": "answer2",
            "action": [
              {
                "id": "7",
                "description": "action3",
                "answerId": "12"
              }
            ],
            "questionId": "1",
            "nextQuestionId": "3"
          }
        ]
      },
      {
        "id": "2",
        "description": "question2",
        "answer": [
          {
            "id": "13",
            "description": "answer3",
            "action": [
              {
                "id": "8",
                "description": "action4",
                "answerId": "13"
              }
            ],
            "questionId": "2",
            "nextQuestionId": "4"
          },
          {
            "id": "14",
            "description": "answer4",
            "action": [],
            "questionId": "2",
            "nextQuestionId": "4"
          }
        ]
      },
      {
        "id": "3",
        "description": "question3",
        "answer": [
          {
            "id": "15",
            "description": "answer5",
            "action": [
              {
                "id": "9",
                "description": "action5",
                "answerId": "15"
              }
            ],
            "questionId": "3",
            "nextQuestionId": "4"
          },
          {
            "id": "16",
            "description": "answer6",
            "action": [
              {
                "id": "10",
                "description": "action6",
                "answerId": "16"
              }
            ],
            "questionId": "3",
            "nextQuestionId": "4"
          }
        ]
      },
      {
        "id": "4",
        "description": "question4",
        "answer": []
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuestionsPage');
  }

  setarResposta(id) {
    this.respostaSelecionada = id;
  }

  exibirToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  pushPageQuestions(): void {
    console.log(this.respostaSelecionada);
    AppModule.oldAction = this.currentAnswer.filter((item) => {
      return (item.id.indexOf(this.respostaSelecionada) > -1);
    });
    AppModule.oldAction = AppModule.oldAction[0].action;

    if (AppModule.newAction == undefined) {
      AppModule.newAction = [];
    }

    for (let i = 0; AppModule.oldAction.length; i++) {
      AppModule.newAction.push(AppModule.oldAction[i]);
    }
    console.log(AppModule.newAction);

    // this.navCtrl.push(QuestionsPage, {
    //   assuntoId: this.respostaSelecionada
    // });
  }

}
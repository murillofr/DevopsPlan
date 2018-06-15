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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public toastCtrl: ToastController) {

      this.initializeItems();

      this.currentQuestion = this.payloadFindAllQuestion.filter((item) => {
        return (item.id.indexOf(this.assuntoId) > -1);
      });

      this.currentAnswer = this.currentQuestion.filter((item) => {
        console.log(item.answer[0]);
        return (item.answer[0]);
      });

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

  exibirToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  pushPageQuestions(assuntoId): void {
    this.navCtrl.push(QuestionsPage, {
      assuntoId: assuntoId
    });
  }

}
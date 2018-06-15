import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { QuestionsPage } from '../pages/questions/questions';
import { HerokuProvider } from '../providers/heroku/heroku';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    QuestionsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    QuestionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HerokuProvider
  ]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { OptionsComponent } from './options/options.component';
import { GameComponent } from './game/game.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { StartPageComponent } from './pages/start-page/start-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OptionsComponent,
    GameComponent,
    SignInComponent,
    CreateAccountComponent,
    StartPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

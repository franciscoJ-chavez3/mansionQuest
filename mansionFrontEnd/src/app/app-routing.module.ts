import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OptionsComponent } from './options/options.component';
import { GameComponent } from './game/game.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { StartPageComponent } from './pages/start-page/start-page.component';


const routes: Routes = [
  { path: '', component: StartPageComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'game', component: GameComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'start', component: StartPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

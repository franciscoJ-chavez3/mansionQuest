import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OptionsComponent } from './options/options.component';
import { GameComponent } from './game/game.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { StartPageComponent } from './pages/start-page/start-page.component';
import { InstructionsComponent } from './pages/instructions/instructions.component';
import { AuthGuardService } from './guards/auth-guard.service';


const routes: Routes = [
  { path: '', component: StartPageComponent, pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'options', component: OptionsComponent },
  { path: 'game', component: GameComponent, canActivate: [AuthGuardService] },
  { path: 'signin', component: SignInComponent },
  { path: 'create', component: CreateAccountComponent },
  { path: 'start', component: StartPageComponent },
  { path: 'instructions', component:InstructionsComponent, canActivate: [AuthGuardService] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

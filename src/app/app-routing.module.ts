import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { StagesComponent } from './stages/stages.component';
import { StageDetailComponent } from './stage-detail/stage-detail.component';
import { FightComponent } from './fight/fight.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'stages', component: StagesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'stageDetail/:id', component: StageDetailComponent },
  { path: 'fight', component: FightComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

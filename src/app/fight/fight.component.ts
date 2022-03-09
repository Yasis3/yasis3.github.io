import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { Equipe } from '../equipe';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FightService } from '../fight.service';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-fight',
  templateUrl: './fight.component.html',
  styleUrls: ['./fight.component.css']
})
export class FightComponent implements OnInit {
  @Input() team?: Equipe;
  @Input() hero?: Hero;

  constructor(
    private route: ActivatedRoute,
    private FightService: FightService,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTeam();
  }

  async getTeam(): Promise<void> {
    await this.FightService.getTeam(4)
      .subscribe(team => {
        this.team = team;
        this.getHero()
      });
  }

  async getHero(): Promise<void> {
    if (this.team) {
      const id = this.team.idPerso1;
      console.log(id);
      await this.heroService.getHero(id)
        .subscribe(hero => this.hero = hero);
    }
  }

  goBack(): void {
    this.location.back();
  }
}

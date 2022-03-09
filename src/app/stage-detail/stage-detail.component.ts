import { Component, OnInit, Input } from '@angular/core';
import { Stage } from '../stage';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { StageService } from '../stage.service';

@Component({
  selector: 'app-stage-detail',
  templateUrl: './stage-detail.component.html',
  styleUrls: ['./stage-detail.component.css']
})
export class StageDetailComponent implements OnInit {
  @Input() stage?: Stage;

  constructor(
    private route: ActivatedRoute,
    private stageService: StageService,
    private location: Location,
  ) { }

  ngOnInit(): void {
    this.getStage();
  }

  getStage(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.stageService.getStage(id)
      .subscribe(stage => this.stage = stage);
  }

  goBack(): void {
    this.location.back();
  }

}

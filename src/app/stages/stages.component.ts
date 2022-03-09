import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { Stage } from '../stage';
import { StageService } from '../stage.service';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrls: ['./stages.component.css']
})
export class StagesComponent implements OnInit {
  stages: Stage[] = [];

  constructor(private stageService: StageService, private messageService: MessageService) { }

  getStages(): void {
    this.stageService.getStages()
      .subscribe(stages => this.stages = stages);
  }

  ngOnInit(): void {
    this.getStages();
  }

}

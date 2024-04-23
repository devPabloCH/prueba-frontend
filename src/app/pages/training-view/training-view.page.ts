import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/models/training';

@Component({
  selector: 'app-training-view',
  templateUrl: './training-view.page.html',
  styleUrls: ['./training-view.page.scss'],
})
export class TrainingViewPage implements OnInit {
  public title: string = 'Reportes';
  public training: Training;

  constructor() {
    this.training = history.state.training;
  }

  ngOnInit() {}
}

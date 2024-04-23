import { Component, Input, OnInit } from '@angular/core';
import { Training } from 'src/app/models/training';

@Component({
  selector: 'app-training-users',
  templateUrl: './training-users.component.html',
  styleUrls: ['./training-users.component.scss'],
})
export class TrainingUsersComponent implements OnInit {
  @Input() training: Training;
  constructor() {}

  ngOnInit() {}
}

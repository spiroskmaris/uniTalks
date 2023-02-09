import { Component, Input, OnInit } from '@angular/core';

export interface ICard {
  id: number;
  created_at: Date;
  title: string;
  text: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() card: ICard | undefined;
  constructor() {}

  ngOnInit(): void {}
}

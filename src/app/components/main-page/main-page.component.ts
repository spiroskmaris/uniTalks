import { Component, OnInit } from '@angular/core';
import { SupabaseService } from 'src/app/services/supabase.service';

export interface ICard {
  id: number;
  created_at: Date;
  title: string;
  text: string;
}

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  public cards: any;
  constructor(public supabase: SupabaseService) {}

  ngOnInit(): void {
    this.supabase.getCards().then((result) => {
      this.cards = result.data;
    });
  }
}

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
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public cards?: ICard[];

  constructor(public supabase: SupabaseService) {}

  ngOnInit(): void {
    this.supabase.resetCards();

    this.supabase.getCards().then((res: ICard[]) => {
      this.cards = res;
    });

    this.supabase.getCardsRT().subscribe((update: any) => {
      const record = update.new?.id ? update.new : update.old;

      this.cards?.push(record);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export default class AppComponent implements OnInit {
  constructor(private supabase: SupabaseService) {}
  ngOnInit(): void {
    this.supabase.getCards();
    console.log(this.supabase.getCards().then(() => {}));
  }
  title = 'Write your story | uniTalks';
}

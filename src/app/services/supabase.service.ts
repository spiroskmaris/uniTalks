import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  public async getCards() {
    const boards = await this.supabase.from('cards').select('*');
    return boards.data || [];
  }

  public async addCard(title: string, text: string) {
    const payload = {
      text: text,
      title: title,
    };
    return this.supabase.from('cards').insert([payload]);
  }

  public resetCards() {
    return this.supabase.rpc('reset_cards');
  }

  public getCardsRT(): Observable<any> {
    const changes = new Subject();

    this.supabase
      .channel('any')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'cards' },
        (payload) => {
          changes.next(payload);
        }
      )
      .subscribe();

    return changes.asObservable();
  }
}

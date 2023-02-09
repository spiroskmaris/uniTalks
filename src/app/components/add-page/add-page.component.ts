import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  constructor(private supabase: SupabaseService, public router: Router) {}
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.supabase.addCard(form.value.title, form.value.text);
    this.router.navigate(['/']);
  }
}

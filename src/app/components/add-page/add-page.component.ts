import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Subscription } from 'rxjs';
import { SupabaseService } from 'src/app/services/supabase.service';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.scss'],
})
export class AddPageComponent implements OnInit {
  public recaptchaSubscription: Subscription | undefined;

  constructor(
    private supabase: SupabaseService,
    public router: Router,
    private recaptchaV3Service: ReCaptchaV3Service
  ) {}

  ngOnInit(): void {
    this.recaptchaV3Service
      .execute('importantAction')
      .subscribe((token: string) => {
        console.debug(`Token [${token}] generated`);
      });
  }

  onSubmit(form: NgForm) {
    this.recaptchaSubscription = this.recaptchaV3Service
      .execute('registerCustomer')
      .subscribe(() => {
        this.supabase.addCard(form.value.title, form.value.text);
        this.router.navigate(['/']);
      });
  }

  ngOnDestroy() {
    if (this.recaptchaSubscription) {
      this.recaptchaSubscription.unsubscribe();
    }
    const element = document.getElementsByClassName(
      'grecaptcha-badge'
    )[0] as HTMLElement;
    if (element) {
      element.style.visibility = 'hidden';
    }
  }
}

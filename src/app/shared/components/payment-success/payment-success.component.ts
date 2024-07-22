import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { isPlatformBrowser } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [MatCardModule, MatDividerModule, RouterLink],
  templateUrl: './payment-success.component.html',
  styleUrl: './payment-success.component.scss',
})
export class PaymentSuccessComponent {
  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }
  ngOnInit() {
    const { paymentId, status } = this.route.snapshot.queryParams;
    this.apiService.verifySession(paymentId).subscribe((res: any) => {
      if (isPlatformBrowser(this.platformId)) {
        let audio = new Audio();
        audio.src = '/gpay.mp3';
        audio.load();
        audio.play();
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      }
    });
  }
}

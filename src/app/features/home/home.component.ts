import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  categories!: Array<any>;
  featuredProducts!: Array<any>
  url: any
  user: any
  constructor(private apiService: ApiService, private route: Router) {
    const localUser = localStorage.getItem('user');
    this.user = localUser && JSON.parse(localUser)
    console.log(route.url)
    this.url = route.url;
    this.apiService.getProduct().subscribe((res: any) => {
      this.featuredProducts = res.data;
    })
    this.apiService.getAllCategory().subscribe((res: any) => {
      this.categories = res.data;
    });
  }
  getImage(src: any) {
    return environment.IMAGE_URL + src
  }
  logout() {
    localStorage.setItem('user', '');
    localStorage.setItem('access_token', '');
    this.route.navigate(['/login'])
  }
}

import { Component, OnInit, inject, signal } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { TopRestaurantsComponent } from '../../components/top-restaurants/top-restaurants.component';
import { HomeData } from '../../models/app.models';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [BannerComponent, TopRestaurantsComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  private readonly restaurantService = inject(RestaurantService);

  protected readonly homeData = signal<HomeData>({ banners: [], restaurants: [], title: 'Top restaurants near you' });

  ngOnInit(): void {
    this.restaurantService.getHomeData().subscribe((data) => this.homeData.set(data));
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestaurantCardComponent } from '../../components/restaurant-card/restaurant-card.component';
import { RestaurantWrapper, SearchCuisine } from '../../models/app.models';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [CommonModule, RouterLink, RestaurantCardComponent],
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent implements OnInit {
  private readonly restaurantService = inject(RestaurantService);

  protected readonly imageBaseUrl =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/';
  protected readonly query = signal('');
  protected readonly cuisines = signal<SearchCuisine[]>([]);
  protected readonly restaurants = signal<RestaurantWrapper[]>([]);

  protected readonly filteredRestaurants = computed(() => {
    const search = this.query().trim().toLowerCase();
    if (!search) {
      return this.restaurants();
    }

    return this.restaurants().filter((restaurant) => {
      const name = restaurant.info.name?.toLowerCase() ?? '';
      const cuisines = (restaurant.info.cuisines ?? []).join(' ').toLowerCase();
      const area = restaurant.info.areaName?.toLowerCase() ?? '';
      return name.includes(search) || cuisines.includes(search) || area.includes(search);
    });
  });

  ngOnInit(): void {
    this.restaurantService.getPopularCuisines().subscribe((cuisines) => this.cuisines.set(cuisines));
    this.restaurantService.getSearchableRestaurants().subscribe((restaurants) => this.restaurants.set(restaurants));
  }
}

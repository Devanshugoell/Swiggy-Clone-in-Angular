import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RestaurantWrapper } from '../../models/app.models';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';

@Component({
  selector: 'app-top-restaurants',
  standalone: true,
  imports: [CommonModule, RouterLink, RestaurantCardComponent],
  templateUrl: './top-restaurants.component.html',
})
export class TopRestaurantsComponent {
  @Input() title = 'Top restaurants near you';
  @Input() restaurants: RestaurantWrapper[] = [];

  protected readonly placeholders = Array.from({ length: 8 }, (_, index) => index);
}

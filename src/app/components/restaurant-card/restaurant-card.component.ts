import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RestaurantInfo } from '../../models/app.models';

@Component({
  selector: 'app-restaurant-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './restaurant-card.component.html',
})
export class RestaurantCardComponent {
  @Input({ required: true }) restaurant!: RestaurantInfo;
  @Input() compact = false;
  @Input() showNewBadge = false;

  protected readonly imageBaseUrl =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/';

  protected get imageHeightClass(): string {
    return this.compact ? 'h-40 sm:h-44' : 'h-44 sm:h-48';
  }
}

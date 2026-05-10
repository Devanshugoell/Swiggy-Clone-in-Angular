import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { MenuItemCard } from '../../models/app.models';

@Component({
  selector: 'app-menu-items',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu-items.component.html',
})
export class MenuItemsComponent {
  @Input() items: MenuItemCard[] = [];

  private readonly cartService = inject(CartService);
  private readonly notificationService = inject(NotificationService);
  private readonly imageBaseUrl =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/';
  private readonly fallbackImage = '/images/placeholderImage.png';

  protected add(item: MenuItemCard): void {
    this.cartService.addItem(item);
    this.notificationService.success(`${item.card.info.name} added to the cart.`);
  }

  protected price(item: MenuItemCard): number {
    return ((item.card.info.price ?? item.card.info.defaultPrice ?? 0) / 100) || 0;
  }

  protected imageUrl(item: MenuItemCard): string {
    return item.card.info.imageId ? `${this.imageBaseUrl}${item.card.info.imageId}` : this.fallbackImage;
  }

}

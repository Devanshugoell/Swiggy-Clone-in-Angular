import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EmptyCartComponent } from '../../components/empty-cart/empty-cart.component';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, EmptyCartComponent],
  templateUrl: './cart-page.component.html',
  styles: [
    `
      .cart-stepper {
        display: inline-flex;
        height: 2rem;
        width: 2rem;
        align-items: center;
        justify-content: center;
        border-radius: 1rem;
        font-size: 1rem;
        font-weight: 800;
        color: rgb(15 23 42);
      }

      .cart-stepper:hover {
        background: white;
      }
    `,
  ],
})
export class CartPageComponent {
  protected readonly cartService = inject(CartService);
  private readonly notificationService = inject(NotificationService);
  private readonly router = inject(Router);

  private readonly imageBaseUrl =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/';

  protected clearCart(): void {
    this.cartService.clearCart();
    this.notificationService.info('Cart cleared.');
  }

  protected remove(itemId: string, itemName: string): void {
    this.cartService.removeItem(itemId);
    this.notificationService.error(`${itemName} removed from the cart.`);
  }

  protected placeOrder(): void {
    this.cartService.clearCart();
    this.notificationService.success('Order placed successfully.');
    this.router.navigate(['/thankyou']);
  }

  protected itemImage(item: any): string {
    return item.card.info.imageId ? `${this.imageBaseUrl}${item.card.info.imageId}` : '/images/placeholderImage.png';
  }
}

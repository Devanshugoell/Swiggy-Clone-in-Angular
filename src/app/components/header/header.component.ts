import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { RestaurantService } from '../../services/restaurant.service';
import { RestaurantWrapper } from '../../models/app.models';
import { RestaurantCardComponent } from '../restaurant-card/restaurant-card.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RestaurantCardComponent],
  templateUrl: './header.component.html',
  styles: [
    `
      .header-link {
        border-radius: 9999px;
        padding: 0.75rem 1rem;
        font-size: 0.95rem;
        font-weight: 700;
        color: rgb(51 65 85);
        transition: background-color 150ms ease, color 150ms ease;
      }

      .header-link:hover,
      .mobile-link:hover {
        background: rgb(255 247 237);
        color: rgb(249 115 22);
      }

      .mobile-link {
        border-radius: 1rem;
        padding: 0.85rem 1rem;
        font-size: 0.95rem;
        font-weight: 700;
        color: rgb(51 65 85);
      }
    `,
  ],
})
export class HeaderComponent {
  protected readonly cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly restaurantService = inject(RestaurantService);
  private readonly router = inject(Router);

  protected readonly mobileMenuOpen = signal(false);
  protected readonly searchOpen = signal(false);
  protected readonly searchLoading = signal(false);
  protected readonly searchQuery = signal('');
  protected readonly allRestaurants = signal<RestaurantWrapper[]>([]);
  protected readonly placeholders = Array.from({ length: 8 }, (_, index) => index);

  protected readonly filteredRestaurants = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const restaurants = this.allRestaurants();

    if (!query) {
      return restaurants;
    }

    return restaurants.filter((restaurant) => {
      const name = restaurant.info.name?.toLowerCase() ?? '';
      const cuisines = (restaurant.info.cuisines ?? []).join(' ').toLowerCase();
      const areaName = restaurant.info.areaName?.toLowerCase() ?? '';
      return name.includes(query) || cuisines.includes(query) || areaName.includes(query);
    });
  });

  protected toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  protected closeSearch(): void {
    this.searchOpen.set(false);
    this.searchQuery.set('');
  }

  protected logout(): void {
    this.authService.logout();
    this.mobileMenuOpen.set(false);
    this.searchOpen.set(false);
    this.router.navigate(['/']);
  }
}

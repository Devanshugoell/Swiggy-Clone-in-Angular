import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuCategoryComponent } from '../../components/menu-category/menu-category.component';
import { RestaurantMenuData } from '../../models/app.models';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-restaurant-menu-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuCategoryComponent],
  templateUrl: './restaurant-menu-page.component.html',
})
export class RestaurantMenuPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly restaurantService = inject(RestaurantService);

  protected readonly loading = signal(true);
  protected readonly menu = signal<RestaurantMenuData | null>(null);
  protected readonly placeholders = Array.from({ length: 3 }, (_, index) => index);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const restaurantId = params.get('resId');
      if (!restaurantId) {
        this.menu.set(null);
        this.loading.set(false);
        return;
      }

      this.loading.set(true);
      this.restaurantService.getRestaurantMenu(restaurantId).subscribe((menu) => {
        this.menu.set(menu);
        this.loading.set(false);
      });
    });
  }

  protected deliveryCharge(): number {
    const amount = this.menu()?.info.feeDetails?.amount ?? 0;
    return amount ? Math.round(amount / 10 + 30) : 30;
  }
}

import { CommonModule } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { MenuCategory } from '../../models/app.models';
import { MenuItemsComponent } from '../menu-items/menu-items.component';

@Component({
  selector: 'app-menu-category',
  standalone: true,
  imports: [CommonModule, MenuItemsComponent],
  templateUrl: './menu-category.component.html',
})
export class MenuCategoryComponent {
  @Input({ required: true }) category!: MenuCategory;

  protected readonly expanded = signal(true);

  protected toggleExpanded(): void {
    this.expanded.set(!this.expanded());
  }
}

import { Injectable, computed, signal } from '@angular/core';
import { MenuItemCard } from '../models/app.models';

const CART_KEY = 'cartItems';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsState = signal<MenuItemCard[]>(this.readInitialState());

  readonly items = computed(() => this.itemsState());
  readonly count = computed(() => this.itemsState().length);
  readonly subtotal = computed(() =>
    this.itemsState().reduce((total, item) => total + this.getItemTotal(item), 0)
  );
  readonly deliveryFee = computed(() => (this.itemsState().length ? 30 : 0));
  readonly total = computed(() => this.subtotal() + this.deliveryFee());

  addItem(item: MenuItemCard): void {
    const items = [...this.itemsState()];
    const existingItem = items.find(
      (entry) => entry.card.info.id === item.card.info.id
    );

    if (existingItem) {
      existingItem.quantity = (existingItem.quantity ?? 1) + 1;
    } else {
      items.push({ ...item, quantity: 1 });
    }

    this.update(items);
  }

  removeItem(itemId: string): void {
    this.update(this.itemsState().filter((item) => item.card.info.id !== itemId));
  }

  decreaseItem(itemId: string): void {
    const items = [...this.itemsState()];
    const existingItem = items.find((item) => item.card.info.id === itemId);

    if (!existingItem) {
      return;
    }

    if ((existingItem.quantity ?? 1) > 1) {
      existingItem.quantity = (existingItem.quantity ?? 1) - 1;
      this.update(items);
      return;
    }

    this.removeItem(itemId);
  }

  increaseItem(itemId: string): void {
    const items = [...this.itemsState()];
    const existingItem = items.find((item) => item.card.info.id === itemId);

    if (!existingItem) {
      return;
    }

    existingItem.quantity = (existingItem.quantity ?? 1) + 1;
    this.update(items);
  }

  clearCart(): void {
    this.update([]);
  }

  getItemPrice(item: MenuItemCard): number {
    return ((item.card.info.price ?? item.card.info.defaultPrice ?? 0) / 100) || 0;
  }

  getItemTotal(item: MenuItemCard): number {
    return this.getItemPrice(item) * (item.quantity ?? 1);
  }

  private update(items: MenuItemCard[]): void {
    this.itemsState.set(items);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }

  private readInitialState(): MenuItemCard[] {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) ?? '[]');
    } catch {
      return [];
    }
  }
}

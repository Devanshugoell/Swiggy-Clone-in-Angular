import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BannerInfo } from '../../models/app.models';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
})
export class BannerComponent {
  @Input() banners: BannerInfo[] = [];

  protected readonly placeholders = Array.from({ length: 8 }, (_, index) => index);
  protected readonly imageBaseUrl =
    'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/';
}

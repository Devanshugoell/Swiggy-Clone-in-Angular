import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import {
  BannerInfo,
  HomeData,
  MenuCategory,
  RestaurantMenuData,
  RestaurantWrapper,
  SearchCuisine,
} from '../models/app.models';

const HOME_API = 'https://foodfire.onrender.com/api/restaurants?lat=28.6139&lng=77.209&page_type=DESKTOP_WEB_LISTING';
const MENU_API = 'https://foodfire.onrender.com/api/menu?page-type=REGULAR_MENU&complete-menu=true&lat=21.1702401&lng=72.83106070000001&&submitAction=ENTER&restaurantId=';
const POPULAR_CUISINES_API = 'https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=12.962163&lng=79.1506201';

@Injectable({ providedIn: 'root' })
export class RestaurantService {
  private readonly http = inject(HttpClient);

  getHomeData(): Observable<HomeData> {
    return this.http.get<any>(HOME_API).pipe(
      map((response) => {
        const cards = response?.data?.cards ?? [];
        const banners: BannerInfo[] =
          cards[0]?.card?.card?.imageGridCards?.info?.map((banner: any) => ({
            id: banner.id,
            imageId: banner.imageId,
            action: banner.action,
          })) ?? [];

        const restaurants: RestaurantWrapper[] =
          cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? [];

        const title = cards[1]?.card?.card?.header?.title ?? 'Top restaurants near you';

        return { banners, restaurants, title };
      }),
      catchError(() => of({ banners: [], restaurants: [], title: 'Top restaurants near you' }))
    );
  }

  getRestaurantMenu(restaurantId: string): Observable<RestaurantMenuData | null> {
    return this.http.get<any>(`${MENU_API}${restaurantId}`).pipe(
      map((response) => {
        const data = response?.data;
        const info = data?.cards?.[2]?.card?.card?.info ?? {};
        const categories: MenuCategory[] =
          data?.cards?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
            ?.filter(
              (card: any) =>
                card?.card?.card?.['@type'] ===
                'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
            )
            ?.map((card: any) => ({
              title: card?.card?.card?.title ?? '',
              itemCards: card?.card?.card?.itemCards ?? [],
            })) ?? [];

        return {
          info,
          categories,
        };
      }),
      catchError(() => of(null))
    );
  }

  getPopularCuisines(): Observable<SearchCuisine[]> {
    return this.http.get<any>(POPULAR_CUISINES_API).pipe(
      map((response) => {
        const cards = response?.data?.cards ?? [];
        return (
          cards.find((item: any) => item?.card?.card?.imageGridCards?.info)?.card?.card
            ?.imageGridCards?.info ?? []
        );
      }),
      catchError(() => of([]))
    );
  }

  getSearchableRestaurants(): Observable<RestaurantWrapper[]> {
    return this.getHomeData().pipe(map((data) => data.restaurants));
  }
}

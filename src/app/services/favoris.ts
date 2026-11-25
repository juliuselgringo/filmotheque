import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Favoris {
  private readonly cle = 'favoris';

  // signal partagé, initialisé depuis localstorage
  readonly favoris = signal<number[]>(
    JSON.parse(localStorage.getItem(this.cle) ?? '[]')
  );

  isFavorites(id:number): boolean {
    return this.favoris().includes(id);
  }

  toggle(id: number) {
    const currents = this.favoris();
    const news = currents.includes(id)
      ? currents.filter((f) => f !== id)
      : [...currents, id];
    this.favoris.set(news);
    localStorage.setItem(this.cle, JSON.stringify(news));
  }

}

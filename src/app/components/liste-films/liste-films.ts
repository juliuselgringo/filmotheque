import { Component, inject, signal } from '@angular/core';
import { Tmdb } from '../../services/tmdb';

interface Film {
    title: string;
    year: number;
    note: number;
}

@Component({
  selector: 'app-liste-films',
  imports: [],
  templateUrl: './liste-films.html',
  styleUrl: './liste-films.css',
})

export class ListeFilms {
  private readonly tmdb = inject(Tmdb);

  films = signal<Film[]>([]);

  constructor() {
    this.tmdb.getPopularFilms().subscribe((response) => {
      this.films.set(
        response.results.map((m) => ({
          title: m.title,
          year: Number(m.release_date.slice(0, 4)),
          note: m.vote_average,
        }))
      );
    });
  }

}

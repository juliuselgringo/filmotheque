import { Component, inject, signal } from '@angular/core';
import { Tmdb } from '../../services/tmdb';
import { RouterLink } from '@angular/router';
import { Favoris } from '../../services/favoris';

interface Film {
    id: number,
    title: string;
    year: number;
    note: number;
    poster: string;
}

@Component({
  selector: 'app-liste-films',
  imports: [RouterLink],
  templateUrl: './liste-films.html',
  styleUrl: './liste-films.css',
})

export class ListeFilms {
  private readonly tmdb = inject(Tmdb);

  public readonly favoris = inject(Favoris);

  films = signal<Film[]>([]);

  query = signal('');

  constructor() {
    this.tmdb.getPopularFilms().subscribe((response) => {
      this.films.set(
        response.results.map((m) => ({
          id: m.id,
          title: m.title,
          year: Number(m.release_date.slice(0, 4)),
          note: m.vote_average,
          poster: this.tmdb.imageUrl(m.poster_path),
        }))
      );
    });
  }

  search() {
    this.tmdb.searchFilms(this.query()).subscribe((response) => {
      this.films.set(
        response.results.map((m) => ({
          id: m.id,
          title: m.title,
          year: Number(m.release_date.slice(0, 4)),
          note: m.vote_average,
          poster: this.tmdb.imageUrl(m.poster_path),
        })
        )
      )
    })
  }

}

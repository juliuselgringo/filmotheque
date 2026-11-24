import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tmdb, TmdbMovie } from '../../services/tmdb';

@Component({
  selector: 'app-fiche-film',
  imports: [],
  templateUrl: './fiche-film.html',
  styleUrl: './fiche-film.css',
})
export class FicheFilm {
  private readonly route = inject(ActivatedRoute);
  private readonly tmdb = inject(Tmdb);
  film = signal<TmdbMovie | null>(null);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.tmdb.getFilmDetails(id).subscribe((f) => {
      this.film.set(f);
    })
  }
}

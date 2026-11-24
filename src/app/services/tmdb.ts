import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.local';

export interface TmdbMovie {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  overview: string;
  poster_path: string;
}

export interface TmdbResponse {
  results: TmdbMovie[];
}

@Injectable({
  providedIn: 'root',
})
export class Tmdb {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey = environment.tmdbApiKey;

  getPopularFilms(): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(
      `${this.baseUrl}/movie/popular?api_key=${this.apiKey}&language=fr-FR`
    );
  }

  searchFilms(query: string): Observable<TmdbResponse> {
    return this.http.get<TmdbResponse>(
      `${this.baseUrl}/search/movie?api_key=${this.apiKey}&language=fr-FR&query=${encodeURIComponent(query)}`
    );
  }

  getFilmDetails(id: string): Observable<TmdbMovie> {
    return this.http.get<TmdbMovie>(
      `${this.baseUrl}/movie/${id}?api_key=${this.apiKey}&language=fr-FR`
    );
  }
}

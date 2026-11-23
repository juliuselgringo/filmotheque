import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.local';

export interface TmdbResponse {
  results: {
    id: number;
    title: string;
    release_date: string;
    vote_average:number;
  }[];
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
    )
  }
}

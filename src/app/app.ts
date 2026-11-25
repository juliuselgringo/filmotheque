import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListeFilms } from './components/liste-films/liste-films';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('les meilleurs films!');
}

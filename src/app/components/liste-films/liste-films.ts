import { Component } from '@angular/core';

interface Film {
    titre: string;
    annee: number;
    note: number;
}

@Component({
  selector: 'app-liste-films',
  imports: [],
  templateUrl: './liste-films.html',
  styleUrl: './liste-films.css',
})

export class ListeFilms {

  films: Film[] = [
    {titre: 'Inception', annee: 2010, note: 8.8}, 
    {titre: 'Interstellar', annee: 2014, note: 8.7},
    {titre:'Le Parrain', annee:1972, note: 9.2}    
  ];

}

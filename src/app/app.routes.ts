import { Routes } from '@angular/router';
import { ListeFilms } from './components/liste-films/liste-films';
import { FicheFilm } from './components/fiche-film/fiche-film';

export const routes: Routes = [
    {path:'', component: ListeFilms},
    {path:'film/:id', component: FicheFilm},
];

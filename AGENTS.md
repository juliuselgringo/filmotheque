# AGENTS.md — Projet d'apprentissage Angular

## Contexte

- Premier projet Angular de l'utilisateur. Objectif : **découvrir les bases d'Angular pas à pas** dans un petit projet concret.
- Profil : développeur, bac +3 en développement. Pas novice en programmation, mais nouveau sur Angular.
- **Rôle de l'agent : pédagogue, pas exécutant.** Ne pas coder à la place de l'utilisateur. Expliquer les concepts, guider étape par étape, laisser l'utilisateur écrire le code. Proposer, faire valider, puis avancer.

## Contraintes du projet

- **Pas de back-end** dédié.
- Une **API publique externe** est autorisée pour apprendre à fetcher des données (HttpClient, services, Observables).
- Données persistées côté client (localStorage) si besoin.

## Approche pédagogique souhaitée

1. Avancer par **petites étapes incrémentales**, chacune avec une explication du concept Angular abordé.
2. Avant chaque étape : expliquer le concept, montrer un exemple minimal, puis laisser l'utilisateur implémenter (ou guider pas à pas).
3. Introduire progressivement : composants, templates, bindings, directives structurelles, services, routing, HttpClient, formulaires, pipes, etc.
4. Ne pas tout livrer d'un coup : un concept à la fois, validé avant de passer au suivant.

## Projet retenu

- **Catalogue de films** (« Filmothèque ») : recherche de films via l'API TMDB, fiche détail, favoris persistés en localStorage.
- Note : éviter le mot « annuaire » (ambiguïté avec l'annuaire téléphonique).

## Environnement

- Projet Angular à créer dans ce dossier (`C:\Users\Julie\autoFORMATIONdev\FrontEnd\Angular`).
- Angular CLI standard (standalone components, pas de NgModules, version récente d'Angular).

## Progression — à reprendre à la prochaine session

### Environnement en place
- Angular CLI installé globalement, projet `filmotheque` créé (Angular 21, standalone) dans ce dossier.
- Extension VSCode « Angular Language Service » installée (ouvrir le dossier projet comme racine de l'espace de travail).
- Serveur de dev : `ng serve` → http://localhost:4200 (hot reload actif).

### Ce qui est fait et fonctionnel
- `src/app/app.html` nettoyé : ne contient plus que `<h1>Ma filmothèque - {{ title() }}</h1>`, `<app-liste-films />` et `<router-outlet />`.
- `src/app/app.ts` : `title = signal('les meilleurs films!')` (interpolation `{{ title() }}` expliquée : échappement XSS automatique).
- Premier composant créé via le CLI : `ng g c components/liste-films` → `src/app/components/liste-films/` (`.ts`, `.html`, `.css`, `.spec.ts`). Le `.spec.ts` est un test unitaire (`ng test`), laissé de côté pour l'instant.
- `ListeFilms` importé dans `app.ts` (`imports: [...]`) et affiché via `<app-liste-films />` dans `app.html` → « liste-films works! » visible dans le navigateur.

### Concepts déjà vus
- Composant racine (`App`), template, interpolation `{{ }}`, signaux (`signal()`), `protected readonly` (visibilité TS, pas une protection XSS), `<router-outlet />` (point d'insertion du routing, `app.routes.ts` encore vide), sélecteur de composant, génération CLI vs édition manuelle dans VSCode.

### Ce qui est fait et fonctionnel (suite)
- `liste-films.ts` : `films = ['Inception', 'Interstellar', 'Le Parrain'];` et boucle `@for` dans `liste-films.html` → la liste s'affiche sur localhost:4200. Concept vu : directive structurelle `@for` (boucle dans le template, `track` obligatoire).

### Ce qui est fait et fonctionnel (suite)
- `liste-films.ts` : `interface Film { titre: string; annee: number; note: number; }` + `films: Film[]` avec 3 films en dur ; `liste-films.html` affiche `{{ film.titre }} ({{ film.annee }}) — {{ film.note }}/10` avec `track film.titre`. Concepts vus : propriétés d'objet dans le template, interface TS. (Piège vu : un décorateur `@Component` doit être immédiatement suivi de sa classe, pas d'une interface → erreur TS1206.)

### Ce qui est fait et fonctionnel (suite)
- `@if (film.note >= 9)` dans `liste-films.html` : badge « Chef-d'œuvre » affiché uniquement sur Le Parrain (9.2). Concept vu : directive structurelle `@if` (bloc affiché si condition vraie), `@else` existe aussi. (Note : si le serveur « plante », vérifier le terminal ng serve + recharger la page.)

### Ce qui est fait et fonctionnel (suite)
- Binding `[class.chef-doeuvre]="film.note >= 9"` sur le `<li>` + style `.chef-doeuvre` dans `liste-films.css` (CSS scopé au composant). Concepts vus : binding de propriété `[class.x]`, styles scopés.

### ÉTAPE EN COURS — API TMDB (en plusieurs sous-étapes)
Objectif : remplacer les films en dur par des données de l'API TMDB.
Fait : clé API v3 dans `src/environments/environment.local.ts` (gitignoré, vérifié avec `git check-ignore` + `git add --dry-run`), `environment.example.ts` committable, `provideHttpClient()` dans `app.config.ts`, service `ng g s services/tmdb` créé (`src/app/services/tmdb.ts`, `@Injectable({ providedIn: 'root' })` = singleton injectable partout).

Fait : `tmdb.ts` compile (ng build OK) — `inject(HttpClient)`, `getPopularFilms(): Observable<...>` sur `https://api.themoviedb.org/3/movie/popular?api_key=...&language=fr-FR`, clé depuis `environment.local`. Note : TMDB accepte aussi l'auth Bearer v4 (JWT en header `Authorization`) ; la clé v3 en query param suffit pour la lecture.

Fait et fonctionnel : liste des films populaires TMDB affichée (appel 200 OK). `tmdb.ts` : `getPopularFilms(): Observable<TmdbResponse>` avec `http.get<TmdbResponse>(...)` (le générique est obligatoire sinon `Observable<Object>` n'est pas assignable). `liste-films.ts` : `films = signal<Film[]>([])` + `subscribe` dans le constructeur avec mapping (`title`, `release_date.slice(0,4)`, `vote_average`). Template : `@for (film of films(); ...)`. Le `@if`/`[class.chef-doeuvre]` fonctionnent sur les vraies notes.
**Leçon clé** : app zoneless (Angular 21, pas de zone.js) → une propriété simple modifiée dans un `subscribe` ne rafraîchit PAS la vue ; il faut un `signal` + `.set(...)`. Toujours utiliser des signaux pour les données async.
Note : certains titres TMDB n'ont pas de traduction fr → titre original (chinois) affiché, c'est normal.

### ÉTAPE SUIVANTE — barre de recherche (expliquée, PAS encore implémentée)
- `Tmdb.searchFilms(query)` sur `/search/movie?query=...&language=fr-FR` avec `encodeURIComponent(query)`.
- `ListeFilms` : `query = signal('')` + méthode `rechercher()` qui `subscribe` et fait `films.set(...)`.
- Template : `<input [value]="query()" (input)="query.set($any($event.target).value)" />` + `<button (click)="rechercher()">Rechercher</button>`.
Concept : binding d'événement `(click)`/`(input)` (parenthèses = on réagit à l'action utilisateur).

### Suite prévue (pas encore abordé)
- Routing (`app.routes.ts`) + fiche détail d'un film (`/film/:id`, endpoint `movie/{id}`).
- Favoris persistés en localStorage.

### Suite prévue (pas encore abordé)
- Recherche de films (champ de recherche + appel API `search/movie`).
- Routing (`app.routes.ts`) + fiche détail d'un film.
- Favoris persistés en localStorage.
- Service + HttpClient pour appeler l'API TMDB (recherche de films) — clé API TMDB à créer et à configurer.
- Routing (`app.routes.ts`) + fiche détail d'un film.
- Favoris persistés en localStorage.

import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './list-heroes';
import { Equipe } from './equipe';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'https://webapiexample20220211141059.azurewebsites.net/Personnage/GetCharacters';  // URL to web api
  private heroUrl = 'https://webapiexample20220211141059.azurewebsites.net/Personnage/GetCharacterById?id=';  // URL to web api
  private postheroesUrl = 'https://webapiexample20220211141059.azurewebsites.net/Personnage/NewSimpleCharacter';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
      tap(_ => this.log('fetched heroes')),
       catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  //404 if id doesn't exists
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroUrl}${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(`https://webapiexample20220211141059.azurewebsites.net/Personnage/SetCharacter?id=${hero.id}&newName=${hero.nom} `, [])
      .pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  //this.heroesUrl, hero, this.httpOptions)

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`https://webapiexample20220211141059.azurewebsites.net/Personnage/NewSimpleCharacter?nom=${hero.nom} `, [])
      .pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
    //this.postheroesUrl, hero, this.httpOptions)
    //this.http.post(`${API_PATH} / Game / AddCharacter ? playerName = ${playerName} & characterName=${character.characterName}`, []);

  /** POST: add a new team to the server */
  addTeam(team: Equipe): Observable<Equipe> {
    return this.http.post<Equipe>(`https://webapiexample20220211141059.azurewebsites.net/Equipe/newEquipe?id=${team.id}&idPerso1=${team.idPerso1}&idPerso2=${team.idPerso2}&idPerso3=${team.idPerso3} `, []);
  }


  /** DELETE: delete the hero from the server */
  deleteHero(id: number): Observable<Hero> {
    return this.http.delete<Hero>(`https://webapiexample20220211141059.azurewebsites.net/Personnage/DeleteCharacterById?id=${id}`)
      .pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /** DELETE: delete the team from the server */
  deleteTeam(id: number): Observable<Equipe> {
    return this.http.delete<Equipe>(`https://webapiexample20220211141059.azurewebsites.net/Equipe/DeleteEquipeById?id=${id}`);
  }

 constructor(
    private http: HttpClient,
   private messageService: MessageService) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

}

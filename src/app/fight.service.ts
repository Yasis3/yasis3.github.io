import { Injectable } from '@angular/core';
import { Equipe } from './equipe';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FightService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getTeam(id: number): Observable<Equipe> {
    return this.http.get<Equipe>(`https://webapiexample20220211141059.azurewebsites.net/Equipe/GetEquipeById?id=${id}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  /** Log a FightService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`FightService: ${message}`);
  }

}

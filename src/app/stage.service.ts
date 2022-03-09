import { Injectable } from '@angular/core';
import { Stage } from './stage';
//import { STAGES } from './list-stages';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StageService {

  private stagesUrl = 'https://webapiexample20220211141059.azurewebsites.net/Stage/GetStages';  // URL to web api
  private stageUrl = 'https://webapiexample20220211141059.azurewebsites.net/Stage/GetStageById?id=';
  httpOptions = {
    headers: new HttpHeaders({ 'Access-Control-Allow-Origin':'*' , 'Content-Type': 'application/json' })
  };

  getStages(): Observable<Stage[]> {
    return this.http.get<Stage[]>(this.stagesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<Stage[]>('getStages', []))
      );
  }

  //404 if id doesn't exists
  getStage(id: number): Observable<Stage> {
    const url = `${this.stageUrl}${id}`;
    return this.http.get<Stage>(url).pipe(
      tap(_ => this.log(`fetched stage id=${id}`)),
      catchError(this.handleError<Stage>(`getStage id=${id}`))
    );
  }

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a StageService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`StageService: ${message}`);
  }

}

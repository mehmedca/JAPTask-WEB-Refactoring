import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { configuration, PagedResult } from '..';
import { ApiService } from './api.service';
import { Movie } from '../_models/movie';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ActorSearch } from '../_models/search/actor-search';
import { Actor } from '../_models/actor';

@Injectable({
    providedIn: 'root'
  })
export class ActorService extends ApiService {
  constructor(http: HttpClient) {
    super(http);
  }

  getActorById(id: number) {
    return this.http.get(
      `${environment.baseUrl}${configuration.endpoints.actors.index}/${id}`
    );
  }

  public getActorsPage(search : ActorSearch) {
    return this.getPage<PagedResult<Actor>>(
      `${configuration.endpoints.actors.index}`,
      search
    );
  }

  getActors() {
    return this.http
      .get(`${environment.baseUrl}${configuration.endpoints.actors.index}`)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  addActor(actor: Actor) {
    return this.http.post(
      `${environment.baseUrl}${configuration.endpoints.actors.index}`,
      actor
    );
  }

  updateActor(id: number, actor: Actor) {
    return this.http.put(
      `${environment.baseUrl}${configuration.endpoints.actors.index}/${id}`,
      actor
    );
  }

  deleteActor(id: number) : Observable<Object>{
    return this.http.delete(
      `${environment.baseUrl}${configuration.endpoints.actors.index}/${id}`
    ); 
  }
}

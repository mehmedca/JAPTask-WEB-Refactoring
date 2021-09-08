import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { configuration, PagedResult } from '..';
import { ApiService } from './api.service';
import { MovieSearch } from '../_models/search/movie-search';
import { Movie } from '../_models/movie';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { MovieInsertRequest } from '../_models/movieinsert';

@Injectable({
    providedIn: 'root'
  })
export class MovieService extends ApiService {
  constructor(http: HttpClient) {
    super(http);
  }


  leaveARating(model: MovieInsertRequest){
    return this.http.post(
      `${environment.baseUrl}${configuration.endpoints.movies.index}/${configuration.endpoints.movies.addRating}`,
      model
    );
  }

  getMovieById(id: number) {
    return this.http.get(
      `${environment.baseUrl}${configuration.endpoints.movies.index}/${id}`
    );
  }

  public getMoviesPage(search : MovieSearch) {
    return this.getPage<PagedResult<Movie>>(
      `${configuration.endpoints.movies.index}`,
      search
    );
  }

  getMovies() {
    return this.http
      .get(`${environment.baseUrl}${configuration.endpoints.movies.index}`)
      .pipe(
        map((data: any) => {
          return data;
        })
      );
  }

  addMovie(movie: Movie) {
    return this.http.post(
      `${environment.baseUrl}${configuration.endpoints.movies.index}`,
      movie
    );
  }

  updateMovie(id: number, movie: Movie) {
    return this.http.put(
      `${environment.baseUrl}${configuration.endpoints.movies.index}/${id}`,
      movie
    );
  }

  deleteMovie(id: number) : Observable<Object>{
    return this.http.delete(
      `${environment.baseUrl}${configuration.endpoints.movies.index}/${id}`
    ); 
  }
}

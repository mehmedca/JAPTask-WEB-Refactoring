import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';


import { Movie, TokenModel } from 'src/app/core';
import { MovieSearch } from 'src/app/core/_models/search/movie-search';
import { MovieService } from '../../../core/_services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  movieSearch: MovieSearch = new MovieSearch();
  loggedUser: TokenModel = {photoUrl: '', roles: [], token: '', userId: '', username: '', validTo: new Date};
  movieTypeList = [{ value: '0', display: 'Movies' }, { value: '1', display: 'TV Shows' }];

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMoviesPage(this.movieSearch).subscribe(response => {
      this.movies = response.results;
      console.log(this.movies);
    })
  }

  resetFilters() {
    this.movieSearch = new MovieSearch();
    this.loadMovies();
  }

  pageChanged(event: any) {
    this.movieSearch.page = event.page;
    this.loadMovies();
  }
}
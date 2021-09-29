import { Component, OnInit } from '@angular/core';

import { Movie, TokenModel } from 'src/app/core';
import { MovieSearch } from 'src/app/core/models/search/movie-search';
import { MovieService } from '../../../core/services/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  movieSearch: MovieSearch = new MovieSearch();
  loggedUser: TokenModel = {
    photoUrl: '',
    roles: [],
    token: '',
    userId: '',
    username: '',
    validTo: new Date(),
  };
  movieTypeList = [
    { value: '0', display: 'Movies' },
    { value: '1', display: 'TV Shows' },
  ];
  hasMoreMovies: boolean = true;
  hasMoreShows: boolean = true;
  keyPressCount: number = 0;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  keyPressUp(){
    this.keyPressCount++;
    if(this.keyPressCount >= 2) this.loadMovies();
  }

  loadMovies() {

    if(!this.hasMoreMovies || !this.hasMoreShows)
    this.movieSearch.page = 1;

    this.movieService.getMoviesPage(this.movieSearch).subscribe((response) => {
  
        if (this.movieSearch.isTvShow) {
        if (
          response.results.length < 10 &&
          (this.movieSearch.textualSearch == '' ||
            this.movieSearch.textualSearch == undefined)
        ) {
          response.results.forEach((x) => {
            this.movies.push(x);
          });
          this.hasMoreShows = false;
        } 
        else if(response.results.length < 10 && this.movieSearch.textualSearch){
          this.movies = response.results;
          this.hasMoreShows = false;
        }
        else {
          this.movies = response.results;
          this.hasMoreShows = true;
        }
      } 
      
      else {
        if (
          response.results.length < 10 &&
          (this.movieSearch.textualSearch == '' ||
            this.movieSearch.textualSearch == undefined)
        ) {
          response.results.forEach((x) => {
            this.movies.push(x);
          });
          this.hasMoreMovies = false;
        } 
        else if(response.results.length < 10 && this.movieSearch.textualSearch){
          this.movies = response.results;
          this.hasMoreMovies = false;
        }
        else {
          this.movies = response.results;
          this.hasMoreMovies = true;
        }
      }
  });
  }

  resetFilters() {
    this.movieSearch = new MovieSearch();
    this.movies.splice(0, this.movies.length);
    this.hasMoreMovies = true;
    this.hasMoreShows = true;
    this.keyPressCount = 0;
    this.loadMovies();
  }

  loadMoreMovies() {
    this.movieSearch.page++;
    this.loadMovies();
  }

  loadMoreShows() {
    this.movieSearch.page++;
    this.loadMovies();
  }
}

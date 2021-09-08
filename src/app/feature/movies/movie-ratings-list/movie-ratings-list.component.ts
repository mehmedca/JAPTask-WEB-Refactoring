import { Component, OnInit } from '@angular/core';
import { Movie, MovieService, TokenModel } from 'src/app/core';
import { MovieSearch } from 'src/app/core/_models/search/movie-search';
import { MovieInsertRequest } from '../../../core/_models/movieinsert';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movie-ratings-list',
  templateUrl: './movie-ratings-list.component.html',
  styleUrls: ['./movie-ratings-list.component.css']
})
export class MovieRatingsListComponent implements OnInit {

  movies: Movie[] = [];
  // pagination: Pagination;
  movieSearch: MovieSearch = new MovieSearch();
  loggedUser: TokenModel = {photoUrl: '', roles: [], token: '', userId: '', username: '', validTo: new Date};
  movieTypeList = [{ value: '0', display: 'Movies' }, { value: '1', display: 'TV Shows' }];

  // movieInsertList: MovieInsertRequest[] = {movieId: 0, ratingInt: 0};
  movieInsertList: MovieInsertRequest[] = [];

  constructor(private movieService: MovieService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    this.movieSearch.retrieveAll = true;
    this.movieService.getMoviesPage(this.movieSearch).subscribe(response => {
      this.movies = response.results;
      this.movies.forEach(x => {
        this.movieInsertList.push({movieId: 0, ratingInt: 0});
      })
    })
  }

   leaveARating(movieId: number, i: number){
    this.movieInsertList[i].movieId = movieId;
    if(this.movieInsertList[i].ratingInt > 0)
      this.movieService.leaveARating(this.movieInsertList[i]).subscribe(res => {
        this.toastr.success("Congratulations, you have successfully left a rating!");
        this.loadMovies();
        this.resetRating();
    })

    else {
      this.toastr.error("Please leave a rating before submiting!", "404 Bad Request");
    }
  }

  resetRating(){
    this.movieInsertList.forEach(x => {
      x.movieId = 0;
      x.ratingInt = 0;
    });
  }

  resetFilters() {
    this.movieSearch = new MovieSearch();
    this.movies.splice(0, this.movies.length);
    this.loadMovies();
  }

}

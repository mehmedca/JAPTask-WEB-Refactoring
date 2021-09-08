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
    // this.movieSearch = this.movieService.getMovieSearchParams();
  }

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies() {
    // this.movieService.setUserParams(this.movieSearch);
    this.movieService.getMoviesPage(this.movieSearch).subscribe(response => {
      this.movies = response.results;
      this.movies.forEach(x => {
        this.movieInsertList.push({movieId: 0, ratingInt: 0});
      })
    })
  }

  // leaveARating(movieId: number){
  //   this.movieInsert.movieId = movieId;
  //   if(this.movieInsert.ratingInt > 0)
  //     this.movieService.leaveARating(this.movieInsert).subscribe(res => {
  //       this.toastr.success("Congratulations, you have successfully left a rating!");
  //       this.loadMovies();
  //       this.resetRating();
  //   })

  //   else {
  //     this.toastr.error("Please leave a rating before submiting!", "404 Bad Request");
  //   }
  // }

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
    // this.movieInsert.movieId = 0;
    // this.movieInsert.ratingInt = 0;

    this.movieInsertList.forEach(x => {
      x.movieId = 0;
      x.ratingInt = 0;
    });
  }

  resetFilters() {
    // this.movieSearch = this.movieService.resetMovieSearchParams();
    this.loadMovies();
  }

  pageChanged(event: any) {
    this.movieSearch.page = event.page;
    // this.movieSearch.setMovieSearchParams(this.movieSearch);
    this.loadMovies();
  }
}

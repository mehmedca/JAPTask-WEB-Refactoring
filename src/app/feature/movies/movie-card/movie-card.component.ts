import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Movie } from '../../../core/_models/movie';
import { MovieService } from '../../../core/_services/movie.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.css']
})
export class MovieCardComponent implements OnInit {
  @Input() movie: Movie = {description: '', id: 0, isTvShow: false, photoId: 0, photoUrl: '', ratingTotal: 0, releaseDate: new        Date, title: ''};

  constructor(private movieService: MovieService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  
}

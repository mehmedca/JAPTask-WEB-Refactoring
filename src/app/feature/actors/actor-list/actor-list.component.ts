import { Component, OnInit } from '@angular/core';

import { Actor, TokenModel } from 'src/app/core';
import { ActorService } from 'src/app/core/services/actor.service';

@Component({
  selector: 'app-actor-list',
  templateUrl: './actor-list.component.html',
  styleUrls: ['./actor-list.component.css']
})
export class ActorListComponent implements OnInit {

  actors: Actor[] = [];
  loggedUser: TokenModel = {photoUrl: '', roles: [], token: '', userId: '', username: '', validTo: new Date};

  constructor(private actorService: ActorService) {
  }

  ngOnInit(): void {
    this.loadActors();
  }

  loadActors() {
    this.actorService.getActors().subscribe(response => {
      this.actors = response.results;
      console.log(this.actors);
    })
  }

}

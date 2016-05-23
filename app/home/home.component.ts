import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'home',
  template: require('./home.component.html')
})
export class HomeComponent implements OnInit {
  public video: string;

  constructor() {

  }

  ngOnInit() {
    // alert('init');
    //
    // var videos = [
    //   '343647377',
    //   '343660890',
    //   '343806260'
    // ];
    //
    // var rand = Math.floor(Math.random() * (videos.length - 1));
    //
    // console.log(rand);
    //
    // this.video = 'video/' + videos[rand] + '.mp4';
  }
};

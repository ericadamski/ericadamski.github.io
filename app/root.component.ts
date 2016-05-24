import { Component, OnInit } from '@angular/core';
import {Routes, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router';
import {ResumeService} from './common/resume.service';
import {ExperienceComponent} from './experience/experience.component';
import {EducationComponent} from './education/education.component';
import {SkillComponent} from './skill/skill.component';
import {ReferenceComponent} from './reference/reference.component';

@Component({
  selector: 'app',
  template: require('./root.component.html'),
  styles: [require('./root.component.css')],
  directives: [
    ROUTER_DIRECTIVES,
    ExperienceComponent,
    EducationComponent,
    SkillComponent,
    ReferenceComponent
  ],
  providers: [
    ROUTER_PROVIDERS,
    ResumeService
  ]
})
@Routes([
])
export class RootComponent implements OnInit {
  public video: string;
  public resume: Object;

  constructor(private _resumeService: ResumeService) {
    var videos = [
      '343647377',
      '343660890',
      '343806260'
    ];

    var rand = Math.floor(Math.random() * (videos.length - 1));

    this.video = 'video/' + videos[rand] + '.mp4';

    this.resume = this._resumeService.get();
  }

  ngOnInit() {
    // alert(this.video);
  }
};

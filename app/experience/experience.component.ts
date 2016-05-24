import { Component, Input } from '@angular/core';
import { Experience } from './experience.model';

@Component({
  selector: 'work-experience',
  template: require('./experience.component.html')
})
export class ExperienceComponent {
  @Input() info: Experience;
}

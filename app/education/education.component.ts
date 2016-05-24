import { Component, Input } from '@angular/core';
import { Education } from './education.model';

@Component({
  selector: 'education',
  template: require('./education.component.html')
})
export class EducationComponent {
  @Input() info: Education;
}

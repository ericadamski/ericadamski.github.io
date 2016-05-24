import { Component, Input } from '@angular/core';
import { Reference } from './reference.model';

@Component({
  selector: 'reference',
  template: require('./reference.component.html')
})
export class ReferenceComponent {
  @Input() info: Reference;
}

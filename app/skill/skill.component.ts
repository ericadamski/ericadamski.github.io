import { Component, Input } from '@angular/core';
import { Skill } from './skill.model';
import {
  Ng2BootstrapConfig, Ng2BootstrapTheme, PROGRESSBAR_DIRECTIVES
} from 'ng2-bootstrap';

@Component({
  selector: 'skill',
  template: require('./skill.component.html'),
  directives: [PROGRESSBAR_DIRECTIVES]
})
export class SkillComponent {
  @Input() info: Skill;
}

import {Injectable} from '@angular/core';
import {Experience} from './experience.model';
import {Education} from './education.model';
import {Skill} from './skill.model';
import {Reference} from './reference.model';
// import {AngularFire} from 'angularfire2';

@Injectable()
export class ResumeService {
  constructor() { }

  public get(): Object {
    return {
      education: this._getEducation(),
      experience: this._getExperience(),
      references: this._getReferences(),
      skills: this._getSkills()
    };
  }

  private _getEducation(): Education[] {
    // console.log(this._af.database.object('/item'));
    return [
      {
        "school": {
          "name": "Carleton University",
          "link": "http://scs.carleton.ca/"
        },
        "degree": "Bachelors in Computer Science",
        "completed": "July 2015"
      }
    ];
  }

  private _getSkills(): Skill[] {

    return [
      {
        "skill": "Git",
        "proficiency": 10
      },
      {
        "skill": "GitFlow",
        "proficiency": 8
      },
      {
        "skill": "Java",
        "proficiency": 8
      },
      {
        "skill": "C",
        "proficiency": 10
      },
      {
        "skill": "C++",
        "proficiency": 8
      },
      {
        "skill": "C#",
        "proficiency": 8
      },
      {
        "skill": "JavaScript",
        "proficiency": 10
      },
      {
        "skill": "Babel",
        "proficiency": 9
      },
      {
        "skill": "CoffeeScript",
        "proficiency": 8
      },
      {
        "skill": "JQuery",
        "proficiency": 7
      },
      {
        "skill": "Express",
        "proficiency": 6
      },
      {
        "skill": "Node.js",
        "proficiency": 7
      },
      {
        "skill": "Jasmine",
        "proficiency": 8
      },
      {
        "skill": "AngularJS",
        "proficiency": 9
      },
      {
        "skill": "Gulp",
        "proficiency": 7
      },
      {
        "skill": "HTML",
        "proficiency": 8
      },
      {
        "skill": "CSS3/SASS",
        "proficiency": 8
      },
      {
        "skill": "Scheme",
        "proficiency": 7
      },
      {
        "skill": "Object-Oriented Design",
        "proficiency": 8
      },
      {
        "skill": "Ruby",
        "proficiency": 9
      },
      {
        "skill": "Visual Studio",
        "proficiency": 6
      },
      {
        "skill": ".Net Framwork",
        "proficiency": 6
      },
      {
        "skill": "Embedded Systems",
        "proficiency": 7
      },
      {
        "skill": "SVN",
        "proficiency": 8
      },
      {
        "skill": "Elasticsearch",
        "proficiency": 7
      },
      {
        "skill": "Redis",
        "proficiency": 7
      },
      {
        "skill": "Logstash",
        "proficiency": 8
      },
      {
        "skill": "BitBucket",
        "proficiency": 9
      }
    ];
  }

  private _getExperience(): Experience[] {

    return [
      {
        "title": "Software Engineer, Averna",
        "date": { "from": "May 2012", "to": "March 2013" },
        "details": "Responsible for programming a large­scale multi­person software project of a real­time embedded system in a team setting, and documenting all software written. Prior to my employment with Averna I had no experience with C# or .Net."
      },
      {
        "title": "Software Engineer, Nanometrics Inc.",
        "date": { "from": "November 2013", "to": "September 2014" },
        "details": "Responsible for Java software design of real­time embedded systems as well as the creation and maintenance of a log management ecosystem. I was tasked with creating an infrastructure to automate and simplify real­time debugging and management of the products. This project required the integration of many open source software projects as well as some software development using Ruby scripting."
      },
      {
        "title": "Teaching Assistant, Carleton University",
        "date": { "from": "January 2015", "to": "April 2015" },
        "details": "Responsible for holding office hours once a week and marking assignments for Introduction to Systems Programming, taught by Dr. Doron Nussbaum. I was able to facilitate further learning in the students by offering them guidance and aiding in problems that they came across throughout the semester."
      },
      {
        "title": "Teaching Assistant, Carleton University",
        "date": { "from": "July 2015", "to": "August 2015" },
        "details": "Responsible for holding office hours once a week and marking assignments for Introduction to Computer Science II, taught by Dr. Andrew Schoenrock. I was able to facilitate further learning in the students by offering them guidance and aiding in problems that they came across throughout the semester."
      }
    ];
  }

  private _getReferences(): Reference[] {

    return [
      {
        "name": "Janet Heffernan",
        "position": "Owner",
        "company": {
          "name": "6Tigers Academy",
          "link": "http://6tigers.com/"
        },
        "phone": "(613) 324-1261"
      }
    ];
  }
}

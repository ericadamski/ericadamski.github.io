import 'core-js';
import 'zone.js/dist/zone';

import { bootstrap } from '@angular/platform-browser-dynamic';
import { ROUTER_PROVIDERS } from '@angular/router';
import { enableProdMode } from '@angular/core';
// import { FIREBASE_PROVIDERS, defaultFirebase } from 'angularfire2';

import { RootComponent } from './root.component';

// if (environment.production) enableProdMode();

bootstrap(RootComponent, [
  ROUTER_PROVIDERS,
  // FIREBASE_PROVIDERS,
  // defaultFirebase('https://ericadamski-githubio-come.firebaseio.com/')
]);

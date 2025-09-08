import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {ProfessorService} from './professor/professor.service';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeng/themes/aura';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    ProfessorService,
    providePrimeNG({
      ripple: false,
      inputVariant: "filled",
      theme: {
        preset: Aura,
      }
    })
  ]
};

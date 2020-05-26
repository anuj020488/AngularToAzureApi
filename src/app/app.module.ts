import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MsalModule, MsalInterceptor, MsalGuard } from '@azure/msal-angular';
import { environment } from 'src/environments/environment';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "**", component: AppComponent, canActivate: [MsalGuard] }
];

export function loggerCallback(logLevel, message, piiEnabled) {
  console.log(message);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MsalModule.forRoot({
      auth: {
        clientId: environment.aadClientId,
        authority: 'https://login.microsoftonline.com/88c2cc7c-d2ca-474c-a708-0881a267b394',
        redirectUri: environment.redirectUrl,
      },
      cache: {
        cacheLocation: 'localStorage',
      },
    },
    {
      // popUp: !isIE,
      consentScopes: [
        environment.aadUserReadScope
      ],
      // unprotectedResources: [],
      protectedResourceMap: [
        [environment.apiBaseUrl, [environment.aadUserReadScope]]
      ],
      // extraQueryParameters: {}
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MsalInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

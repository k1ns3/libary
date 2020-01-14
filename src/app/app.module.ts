import { BrowserModule } from "@angular/platform-browser";
import { NgModule, ErrorHandler } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ServiceWorkerModule } from "@angular/service-worker";

import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { AppRoutingModule } from "./app-routing.module";
import { ScoutLibraryLoginModule } from "./scout-library-login/scout-library-login.module";

import { AppComponent, AppErrorHandler } from "./app.component";

import { AuthEffects } from "./root-store/effects/auth.effects";
import { reducers, metaReducers } from "./root-store/root.store";
import { DataEffects } from "./root-store/effects/data.effects";

import { environment } from "../environments/environment";
import { MaterialAppModule } from "./ngmaterial.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialAppModule,
    HttpClientModule,
    AppRoutingModule,
    ScoutLibraryLoginModule,
    ServiceWorkerModule.register("/ngsw-worker.js", {
      enabled: environment.production
    }),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    EffectsModule.forRoot([AuthEffects, DataEffects])
  ],
  providers: [{ provide: ErrorHandler, useClass: AppErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule {}

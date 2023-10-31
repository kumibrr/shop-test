import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: "**",
        component: NotFoundComponent,
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

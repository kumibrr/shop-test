import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found/not-found.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./shared/guards/auth.guard";
import { NotAuthGuard } from "./shared/guards/not-auth.guard";

@NgModule({
  declarations: [AppComponent, NotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: "login",
        loadChildren: "./pages/login/login.module#LoginModule",
        canActivate: [NotAuthGuard],
      },
      {
        path: "",
        loadChildren: "./pages/products/products.module#ProductsModule",
        canActivate: [AuthGuard],
      },
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

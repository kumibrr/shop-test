import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found.component";
import { HttpClientModule } from "@angular/common/http";
import { AuthGuard } from "./shared/guards/auth.guard";
import { NotAuthGuard } from "./shared/guards/not-auth.guard";
import { AdminGuard } from "./shared/guards/admin.guard";

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
        path: "admin",
        loadChildren: "./pages/admin/admin.module#AdminModule",
        canActivate: [AdminGuard],
      },
      {
        path: "404",
        component: NotFoundComponent,
      },
      {
        path: "**",
        redirectTo: "404",
      },
    ]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

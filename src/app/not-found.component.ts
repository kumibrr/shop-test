import { Component } from "@angular/core";

@Component({
  selector: "app-not-found",
  template: `
    <div>
      <h1>404</h1>
      <h5>not found</h5>
    </div>
    <a routerLink="/">Go back to the home page</a>
  `,
  styles: [
    `
      :host {
        height: 100dvh;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    `,
    `
      div {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
    `
      h1 {
        font-size: 4.5em;
      }
    `,
  ],
})
export class NotFoundComponent {}

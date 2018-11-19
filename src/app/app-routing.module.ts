import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SpinnerComponent } from "./spinner/spinner.component";

const routes: Routes = [{ path: "", component: SpinnerComponent, pathMatch: "full" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

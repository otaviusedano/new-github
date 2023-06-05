import { NgModule } from "@angular/core"
import { BrowserModule } from "@angular/platform-browser"

import { AppComponent } from "./app.component"
import { ButtonComponent } from "./button/button.component"
import { SearchBarComponent } from "./search-bar/search-bar.component"
import { HttpClientModule } from "@angular/common/http"
import { RepoComponent } from "./repo/repo.component"
import { HeaderComponent } from "./header/header.component"
import { LanguagesComponent } from "./languages/languages.component"
import { PaginationComponent } from "./pagination/pagination.component"
import { SearchButtonComponent } from "./search-button/search-button.component"

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    SearchBarComponent,
    RepoComponent,
    HeaderComponent,
    LanguagesComponent,
    PaginationComponent,
    SearchButtonComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

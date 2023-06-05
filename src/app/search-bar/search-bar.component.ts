import { Component } from "@angular/core"
import { SearchService } from "src/services/search.service"

@Component({
  selector: "app-search-bar",
  templateUrl: "./search-bar.component.html",
})
export class SearchBarComponent {
  constructor(private service: SearchService) {}

  public handleSetRepos() {
    if (this.service.getSearch()) this.service.setRepos()
  }

  public handleSetSearch(search: string) {
    return this.service.setSearch(search)
  }
}

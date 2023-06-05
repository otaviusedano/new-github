import { Component } from "@angular/core"
import { SearchService } from "src/services/search.service"

@Component({
  selector: "app-search-button",
  templateUrl: "./search-button.component.html",
  styleUrls: ["./search-button.component.scss"],
})
export class SearchButtonComponent {
  constructor(private service: SearchService) {}

  public handleSetRepos() {
    if (this.service.getSearch()) this.service.setRepos()
  }
}

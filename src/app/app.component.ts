import { Component, OnInit } from "@angular/core"

import { SearchService } from "src/services/search.service"

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  constructor(private service: SearchService) {}
  private allResults!: number

  public ngOnInit() {
    this.service.setMyRepos()
    this.setAllResults()
  }

  public setAllResults() {
    this.service
      .getRepoCount()
      .subscribe((results: number) => (this.allResults = results))
  }

  public getAllResults() {
    return this.allResults
  }
}

import { Component } from "@angular/core"
import { Repository } from "./repo.model"
import { SearchService } from "src/services/search.service"

@Component({
  selector: "app-repo",
  templateUrl: "./repo.component.html",
})
export class RepoComponent {
  constructor(private service: SearchService) {}
  private repos: Repository[] = []

  public getRepos() {
    return this.repos
  }

  public setRepos(repos: Repository[]) {
    this.repos = repos
  }

  public formatStars(stars: number) {
    if (stars > 999) {
      const suffixes = ["", "k"]
      const index = Math.floor(Math.log10(stars) / 3)
      const formattedStars = (stars / Math.pow(1000, index)).toFixed(1)
      return formattedStars + suffixes[index]
    }

    return stars
  }

  public filterRepos() {
    const search = this.service.getSearch()
    const searchSaved = this.service.getSearchSaved()
    const reposFromSearch = this.service.getReposFromSearch()
    const myRepos = this.service.getMyRepos()

    this.repos = myRepos

    if (searchSaved) this.repos = reposFromSearch

    if (search) {
      return this.repos.filter((repo: Repository) =>
        repo.name.toLowerCase().includes(search.toLowerCase().trim())
      )
    }

    return this.repos
  }
}

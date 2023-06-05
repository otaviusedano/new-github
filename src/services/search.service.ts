import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { QueryParams, Response } from "./search.model"
import { BehaviorSubject } from "rxjs"
import { Repository } from "src/app/repo/repo.model"

@Injectable({
  providedIn: "root",
})
export class SearchService {
  constructor(private http: HttpClient) {}

  private readonly API_SEARCH =
    "https://api.github.com/search/repositories?q=in:name%20"
  private readonly API_MY_REPOS =
    "https://api.github.com/search/repositories?q=+user:otaviusedano"
  private queryParams: { per_page: number; page: number } = {
    page: 1,
    per_page: 5,
  }
  private currentPage = 1
  private search!: string
  private searchSaved!: string
  private isFirstSearch = false
  private reposFromSearch: Repository[] = []
  private myRepos: Repository[] = []
  private repoCountSubject = new BehaviorSubject(1)

  public getCurrentPage() {
    return this.currentPage
  }

  public setCurrentPage(currentPage: number) {
    this.currentPage = currentPage
  }

  public getRepoCount() {
    return this.repoCountSubject.asObservable()
  }

  public setRepoCount(repoCount: number) {
    return this.repoCountSubject.next(repoCount)
  }

  public getLimitPages() {
    return this.queryParams.per_page
  }

  public getSearch() {
    return this.search
  }

  public setSearch(search: string) {
    this.search = search
  }

  public getSearchSaved() {
    return this.searchSaved
  }

  public setSearchSaved(search: string) {
    this.searchSaved = search
  }

  public getQueryParams() {
    return this.queryParams
  }

  public setQueryParams(queryParams: QueryParams) {
    this.queryParams = queryParams
  }

  public getIsFirstSearch() {
    return this.isFirstSearch
  }

  public setTrueForIsFirstSearch() {
    this.isFirstSearch = true
  }

  public getMyRepos() {
    return this.myRepos
  }

  public myReposHttp() {
    return this.http.get<Response>(this.API_MY_REPOS, {
      params: this.queryParams,
    })
  }

  public setMyRepos() {
    this.myReposHttp().subscribe(({ items, total_count }: Response) => {
      this.myRepos = items
      this.setRepoCount(total_count)
    })
  }

  public getReposFromSearch() {
    return this.reposFromSearch
  }

  public reposFromSearchHttp() {
    return this.http.get<Response>(this.API_SEARCH + this.searchSaved, {
      params: this.queryParams,
    })
  }

  public setReposFromSearch() {
    this.reposFromSearchHttp().subscribe(({ items, total_count }: Response) => {
      this.reposFromSearch = items
      this.setRepoCount(total_count)
    })
  }

  public setRepos() {
    this.setSearchSaved(this.search)
    this.setTrueForIsFirstSearch()
    this.setCurrentPage(1)
    this.setQueryParams({ page: 1, per_page: 5 })
    this.setReposFromSearch()
  }
}

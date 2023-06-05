import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { SearchService } from "src/services/search.service"

@Component({
  selector: "app-pagination",
  templateUrl: "./pagination.component.html",
})
export class PaginationComponent implements OnInit {
  constructor(private service: SearchService) {}

  private pages: number[] = []
  private allResults!: Observable<number>
  private pagesCount!: number

  public ngOnInit() {
    this.allResults = this.service.getRepoCount()
  }

  public getCurrentPage() {
    return this.service.getCurrentPage()
  }

  public getAllResults() {
    return this.allResults
  }

  public getPages() {
    return this.pages
  }

  public setPages() {
    this.service.getRepoCount().subscribe((allResults = 1) => {
      this.pagesCount = Math.ceil(allResults / this.service.getLimitPages())
      const pagesCut = this.getPagesCut()
      this.pages = this.createPages(pagesCut.start, pagesCut.end)
    })

    return this.pages
  }

  public getPagesCut() {
    const pagesCut = this.service.getQueryParams().per_page
    const ceil = Math.ceil(pagesCut / 2)
    const floor = Math.floor(pagesCut / 2)
    const currentPage = this.service.getCurrentPage()

    if (this.pagesCount < pagesCut) {
      return { start: 1, end: this.pagesCount + 1 }
    } else if (currentPage >= 1 && currentPage <= ceil) {
      return { start: 1, end: pagesCut + 1 }
    } else if (currentPage + floor >= this.pagesCount) {
      return { start: this.pagesCount - pagesCut + 1, end: this.pagesCount + 1 }
    }
    return {
      start: currentPage - ceil + 1,
      end: currentPage + floor + 1,
    }
  }

  public createPages(init: number, end: number) {
    return [...Array(end - init).keys()].map((page) => page + init)
  }

  public handleNextPage() {
    let currentPage = this.service.getCurrentPage()

    if (currentPage === this.pagesCount) return
    const newQueryParams = { page: currentPage++, per_page: 5 }

    this.service.setQueryParams(newQueryParams)
    this.handleSetCurrentPage(currentPage)
  }

  public handlePrevPage() {
    let currentPage = this.service.getCurrentPage()

    if (currentPage === 1) return
    const newQueryParams = { page: currentPage--, per_page: 5 }

    this.service.setQueryParams(newQueryParams)
    this.handleSetCurrentPage(currentPage)
  }

  public handleSetCurrentPage(page: number) {
    const currentPage = this.service.getQueryParams().page
    if (currentPage == page) return

    const search = this.service.getSearchSaved()
    const isFirstSearch = this.service.getIsFirstSearch()
    const reposFromSearch = this.service.getReposFromSearch()

    this.service.setCurrentPage(page)
    this.service.getQueryParams().page = page

    if ((search || reposFromSearch) && isFirstSearch)
      this.service.setReposFromSearch()

    if (!this.service.getIsFirstSearch()) this.service.setMyRepos()
  }
}

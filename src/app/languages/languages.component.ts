import { HttpClient } from "@angular/common/http"
import { Component, Input, OnInit } from "@angular/core"

@Component({
  selector: "app-languages",
  templateUrl: "./languages.component.html",
})
export class LanguagesComponent implements OnInit {
  constructor(private http: HttpClient) {}
  private languages: string[] = []
  private hasLangs = false

  @Input() public languageUrl!: string

  public ngOnInit() {
    this.setLanguages()
  }

  public getHasLangs() {
    return this.hasLangs
  }

  public setTrueForHasLangs() {
    this.hasLangs = true
  }

  public setFalseForHasLangs() {
    this.hasLangs = true
  }

  public getLanguages() {
    return this.languages
  }

  public languagesHttp() {
    return this.http.get<string>(this.languageUrl)
  }

  public setLanguages() {
    this.languagesHttp().subscribe((res: string) => {
      this.languages = Object.keys(res)
      this.languages.length > 2
        ? (this.hasLangs = true)
        : (this.hasLangs = false)
    })
  }
}

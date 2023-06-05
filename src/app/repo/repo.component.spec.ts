import { ComponentFixture, TestBed } from "@angular/core/testing"

import { RepoComponent } from "./repo.component"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { SearchService } from "src/services/search.service"
import { NO_ERRORS_SCHEMA } from "@angular/core"

describe("RepoComponent", () => {
  let component: RepoComponent
  let fixture: ComponentFixture<RepoComponent>
  let service: SearchService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [RepoComponent],
      providers: [{ provide: service, useClass: RepoComponent }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    fixture = TestBed.createComponent(RepoComponent)
    service = TestBed.inject(SearchService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should be create", () => {
    expect(component).toBeTruthy()
  })

  it("#filterRepos should be called on render the component", () => {
    spyOn(component, "filterRepos")

    fixture.detectChanges()
    expect(component.filterRepos).toHaveBeenCalled()
  })

  it("#formatStars should return formatted stars", async () => {
    expect(component.formatStars(25500)).toEqual("25.5k")
  })
})

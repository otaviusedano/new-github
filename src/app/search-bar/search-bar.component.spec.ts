import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SearchBarComponent } from "./search-bar.component"
import { SearchService } from "src/services/search.service"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { By } from "@angular/platform-browser"
import { NO_ERRORS_SCHEMA } from "@angular/core"

describe("SearchButtonComponent", () => {
  let component: SearchBarComponent
  let fixture: ComponentFixture<SearchBarComponent>
  let service: SearchService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SearchBarComponent],
      providers: [
        {
          provide: service,
          useClass: SearchBarComponent,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    fixture = TestBed.createComponent(SearchBarComponent)
    service = TestBed.inject(SearchService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("#handleSetRepos should be called on enter", async () => {
    spyOn(component, "handleSetRepos")

    const { debugElement } = fixture
    const searchBarDe = debugElement.query(By.css('[data-testid="input"]'))
    searchBarDe.triggerEventHandler("keyup.enter")

    await fixture.whenStable()
    expect(component.handleSetRepos).toHaveBeenCalledTimes(1)
  })

  it("#setRepos should not work without search have content", async () => {
    spyOn(service, "setRepos")
    const { debugElement } = fixture
    const searchBarDe = debugElement.query(By.css('[data-testid="input"]'))

    service.setSearch("")
    searchBarDe.triggerEventHandler("keyup.enter")

    await fixture.whenStable()
    expect(service.setRepos).not.toHaveBeenCalled()

    service.setSearch("test")
    searchBarDe.triggerEventHandler("keyup.enter")

    await fixture.whenStable()
    expect(service.setRepos).toHaveBeenCalledTimes(1)
  })

  it("#setSearchSaved should be called on enter", async () => {
    spyOn(service, "setSearchSaved")

    service.setSearch("just for test")

    const { debugElement } = fixture
    const searchBarDe = debugElement.query(By.css('[data-testid="input"]'))
    searchBarDe.triggerEventHandler("keyup.enter")

    await fixture.whenStable()
    expect(service.setSearchSaved).toHaveBeenCalledTimes(1)
  })

  it("#setTrueForIsFirstSearch should be called on enter", async () => {
    spyOn(service, "setTrueForIsFirstSearch")

    service.setSearch("just for test")

    const { debugElement } = fixture
    const searchBarDe = debugElement.query(By.css('[data-testid="input"]'))
    searchBarDe.triggerEventHandler("keyup.enter")

    await fixture.whenStable()
    expect(service.setTrueForIsFirstSearch).toHaveBeenCalledTimes(1)
  })

  it("#setQueryParams should be called on enter", async () => {
    spyOn(service, "setQueryParams")

    service.setSearch("just for test")

    const { debugElement } = fixture
    const searchBarDe = debugElement.query(By.css('[data-testid="input"]'))
    searchBarDe.triggerEventHandler("keyup.enter")

    await fixture.whenStable()
    expect(service.setQueryParams).toHaveBeenCalledTimes(1)
  })

  it("#setReposFromSearch should be called on enter", async () => {
    spyOn(service, "setReposFromSearch")

    service.setSearch("just for test")

    const { debugElement } = fixture
    const searchBarDe = debugElement.query(By.css('[data-testid="input"]'))
    searchBarDe.triggerEventHandler("keyup.enter")

    await fixture.whenStable()
    expect(service.setReposFromSearch).toHaveBeenCalledTimes(1)
  })

  it("#setCurrentPage should be called on enter", async () => {
    spyOn(service, "setCurrentPage")

    service.setSearch("just for test")

    const { debugElement } = fixture
    const searchBarDe = debugElement.query(By.css('[data-testid="input"]'))
    searchBarDe.triggerEventHandler("keyup.enter")

    await fixture.whenStable()
    expect(service.setCurrentPage).toHaveBeenCalledTimes(1)
  })

  it("input type should be text", () => {
    const { debugElement } = fixture
    const searchBarDe = debugElement.query(By.css('[data-testid="input"]'))
    const input: HTMLInputElement = searchBarDe.nativeElement

    expect(input.type).toBe("text")
  })

  it("#handleSetSearch should be called on input", async () => {
    spyOn(component, "handleSetSearch")

    const { debugElement } = fixture
    const searchBarDe = debugElement.query(By.css('[data-testid="input"]'))
    searchBarDe.triggerEventHandler("input")

    await fixture.whenStable()
    expect(component.handleSetSearch).toHaveBeenCalled()
  })
})

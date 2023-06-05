import { ComponentFixture, TestBed } from "@angular/core/testing"

import { SearchButtonComponent } from "./search-button.component"
import { SearchService } from "src/services/search.service"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { By } from "@angular/platform-browser"
import { NO_ERRORS_SCHEMA } from "@angular/core"

describe("SearchButtonComponent", () => {
  let component: SearchButtonComponent
  let fixture: ComponentFixture<SearchButtonComponent>
  let service: SearchService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SearchButtonComponent],
      providers: [
        {
          provide: service,
          useClass: SearchButtonComponent,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    fixture = TestBed.createComponent(SearchButtonComponent)
    service = TestBed.inject(SearchService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should be create", () => {
    expect(component).toBeTruthy()
  })

  it("#handleSetRepos should be called on click", async () => {
    spyOn(component, "handleSetRepos")

    const { debugElement } = fixture
    const searchButtonDe = debugElement.query(By.css('[data-testid="button"]'))
    searchButtonDe.triggerEventHandler("click")

    await fixture.whenStable()
    expect(component.handleSetRepos).toHaveBeenCalledTimes(1)
  })

  it("#setRepos should not work without search have content", async () => {
    spyOn(service, "setRepos")
    const { debugElement } = fixture
    const searchButtonDe = debugElement.query(By.css('[data-testid="button"]'))

    service.setSearch("")
    searchButtonDe.triggerEventHandler("click")

    await fixture.whenStable()
    expect(service.setRepos).not.toHaveBeenCalled()

    service.setSearch("test")
    searchButtonDe.triggerEventHandler("click")

    await fixture.whenStable()
    expect(service.setRepos).toHaveBeenCalledTimes(1)
  })
})

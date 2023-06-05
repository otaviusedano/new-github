import { ComponentFixture, TestBed } from "@angular/core/testing"

import { PaginationComponent } from "./pagination.component"
import { HttpClientTestingModule } from "@angular/common/http/testing"
import { SearchService } from "src/services/search.service"
import { NO_ERRORS_SCHEMA } from "@angular/core"
import { By } from "@angular/platform-browser"

describe("PaginationComponent", () => {
  let component: PaginationComponent
  let fixture: ComponentFixture<PaginationComponent>
  let service: SearchService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PaginationComponent],
      providers: [
        {
          provide: service,
          useClass: PaginationComponent,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    fixture = TestBed.createComponent(PaginationComponent)
    service = TestBed.inject(SearchService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should created", () => {
    expect(component).toBeTruthy()
  })

  it("lis should be create", () => {
    const lis = fixture.nativeElement.querySelectorAll('[data-testid="li"]')
    expect(lis).toBeTruthy()
  })

  it("#setPages length should be equal to lis createds", () => {
    component.setPages()
    const lis = fixture.nativeElement.querySelectorAll('[data-testid="li"]')

    expect(lis.length).toBe(component.getPages().length)
  })

  it("#ngOnInit should be called #setPages", () => {
    spyOn(component, "setPages")
    fixture.detectChanges()
    expect(component.setPages).toHaveBeenCalled()
  })

  it("#page should be textcontent from li", async () => {
    const pages = component.getPages()

    const { debugElement } = fixture
    const lisDe = debugElement.queryAll(By.css('[data-testid="li"]'))

    lisDe.forEach(async (li, index) => {
      lisDe[index].triggerEventHandler("click")
      await fixture.whenStable()
      expect(pages[index].toString()).toContain(
        li.nativeElement.textContent.trim()
      )
    })
  })

  it("#getCurrentPage should be called on click in li to change the background color", async () => {
    spyOn(component, "getCurrentPage")
    const { debugElement } = fixture
    const lisDe = debugElement.queryAll(By.css('[data-testid="li"]'))

    lisDe.forEach(async (_, index) => {
      lisDe[index].triggerEventHandler("click")
      await fixture.whenStable()
      expect(lisDe[index].properties["className"]).toContain("bg-blue-40")
    })
  })

  it("#handleSetCurrentPage should be called on click in li", async () => {
    spyOn(component, "handleSetCurrentPage")
    const { debugElement } = fixture
    const lisDe = debugElement.queryAll(By.css('[data-testid="li"]'))

    lisDe[0].triggerEventHandler("click")
    await fixture.whenStable()
    expect(component.handleSetCurrentPage).toHaveBeenCalled()
  })

  it("#handleNextPage should be called on click in next button", async () => {
    spyOn(component, "handleNextPage")

    const { debugElement } = fixture
    const buttonDe = debugElement.query(By.css('[data-testid="next-button"]'))

    buttonDe.triggerEventHandler("click")

    await fixture.whenStable()
    expect(component.handleNextPage).toHaveBeenCalledTimes(1)
  })

  it("#handlePrevPage should be called on click in prev button", async () => {
    spyOn(component, "handlePrevPage")

    const { debugElement } = fixture
    const buttonDe = debugElement.query(By.css('[data-testid="prev-button"]'))
    buttonDe.triggerEventHandler("click")

    await fixture.whenStable()
    expect(component.handlePrevPage).toHaveBeenCalledTimes(1)
  })

  it("#getRepoCount and #getAllResults should be equal", async () => {
    let numberFromRepoCount = 0
    let numberFromAllResults = 0

    service.getRepoCount().subscribe((res) => (numberFromRepoCount = res))
    component.getAllResults().subscribe((res) => (numberFromAllResults = res))
    await fixture.whenStable()
    expect(numberFromAllResults).toEqual(numberFromRepoCount)
  })

  it("#ngOnInit should be set #allResults", () => {
    spyOn(service, "getRepoCount")
    component.ngOnInit()
    expect(service.getRepoCount).toHaveBeenCalledTimes(1)
  })

  it("#getRepoCount should set #allResults to 1", () => {
    let initialRepoCount: number
    component.getAllResults().subscribe((res) => (initialRepoCount = res))

    service.getRepoCount().subscribe((res) => {
      expect(initialRepoCount).toEqual(res)
    })
  })
})

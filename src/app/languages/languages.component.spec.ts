import { ComponentFixture, TestBed } from "@angular/core/testing"

import { LanguagesComponent } from "./languages.component"
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing"
import { NO_ERRORS_SCHEMA } from "@angular/core"
import { By } from "@angular/platform-browser"

describe("LanguagesComponent", () => {
  let component: LanguagesComponent
  let fixture: ComponentFixture<LanguagesComponent>
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LanguagesComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    fixture = TestBed.createComponent(LanguagesComponent)
    component = fixture.componentInstance
    httpMock = TestBed.inject(HttpTestingController)
    fixture.detectChanges()
  })

  it("should created", () => {
    expect(component).toBeTruthy()
  })

  it("#ngOnInit should be call #setLanguages", () => {
    spyOn(component, "setLanguages")
    component.ngOnInit()
    expect(component.setLanguages).toHaveBeenCalledTimes(1)
  })

  it("#getLanguages should be return #languages", () => {
    expect(component.getLanguages()).toEqual([])
  })

  it("#getHasLangs should be return #hasLangs", () => {
    expect(component.getHasLangs()).not.toBeTrue()
  })

  it("#setLanguages should be working and fetching datas from exactly url", () => {
    const expectedResponse = ["TypeScript", "SCSS", "HTML"]

    const expectedUrl =
      "https://api.github.com/repos/otaviusedano/translation/languages"

    component.languageUrl = expectedUrl

    component.ngOnInit()
    fixture.detectChanges()

    const req = httpMock.expectOne(expectedUrl)
    expect(req.request.method).toBe("GET")

    req.flush(expectedResponse)
  })

  it("#ul should be created if #HasLangs be true", () => {
    const { debugElement } = fixture
    let ulDe = debugElement.query(By.css('[data-testid="ul"]'))

    expect(ulDe).not.toBeTruthy()

    component.setTrueForHasLangs()

    fixture.detectChanges()

    ulDe = debugElement.query(By.css('[data-testid="ul"]'))

    expect(ulDe).toBeTruthy()
  })
})

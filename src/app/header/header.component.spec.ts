import { ComponentFixture, TestBed } from "@angular/core/testing"

import { HeaderComponent } from "./header.component"
import { NO_ERRORS_SCHEMA } from "@angular/core"
import { By } from "@angular/platform-browser"

describe("HeaderComponent", () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should created", () => {
    expect(component).toBeTruthy()
  })

  it("should create github icon", () => {
    const { debugElement } = fixture
    const githubIconDe = debugElement.query(
      By.css('[data-testid="github icon"]')
    )

    expect(githubIconDe.nativeElement).toBeTruthy()
  })

  it("should create lupe icon", () => {
    const { debugElement } = fixture
    const lupeIconDe = debugElement.query(By.css('[data-testid="lupe icon"]'))

    expect(lupeIconDe.nativeElement).toBeTruthy()
  })

  it("should create github icon with src working", () => {
    const expectedGithubSrc = "/assets/icon-github.svg"

    const { debugElement } = fixture
    const githubIconDe = debugElement.query(
      By.css('[data-testid="github icon"]')
    )
    const githubSrc = githubIconDe.nativeElement.src

    expect(githubSrc).toContain(expectedGithubSrc)
  })

  it("should create lupe icon with src working", () => {
    const expectedLupeSrc = "/assets/icon-search.svg"

    const { debugElement } = fixture
    const lupeIconDe = debugElement.query(By.css('[data-testid="lupe icon"]'))
    const lupeSrc = lupeIconDe.nativeElement.src

    expect(lupeSrc).toContain(expectedLupeSrc)
  })

  it("should create link to my github", () => {
    const { debugElement } = fixture
    const linkDe = debugElement.query(By.css('[data-testid="link"]'))

    expect(linkDe.nativeElement).toBeTruthy()
  })

  it("should create link with href to my github", () => {
    const expectedLink = "https://github.com/otaviusedano"

    const { debugElement } = fixture
    const linkDe = debugElement.query(By.css('[data-testid="link"]'))
    const lupeSrc = linkDe.nativeElement.href

    expect(lupeSrc).toEqual(expectedLink)
  })

  it("should create my photo with src working", () => {
    const expectedSrc = "/assets/me.jpg"

    const { debugElement } = fixture
    const imgDe = debugElement.query(By.css('[data-testid="photo"]'))
    const imgSrc = imgDe.nativeElement.src

    expect(imgSrc).toContain(expectedSrc)
  })
})

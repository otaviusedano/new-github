import { ComponentFixture, TestBed } from "@angular/core/testing"
import { AppComponent } from "./app.component"
import { SearchService } from "src/services/search.service"
import { NO_ERRORS_SCHEMA } from "@angular/core"
import { HttpClientTestingModule } from "@angular/common/http/testing"

describe("AppComponent", () => {
  let component: AppComponent
  let fixture: ComponentFixture<AppComponent>
  let service: SearchService

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
      providers: [
        {
          provide: service,
          useClass: AppComponent,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents()
    fixture = TestBed.createComponent(AppComponent)
    service = TestBed.inject(SearchService)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should be create", () => {
    expect(component).toBeTruthy()
  })

  it("#ngOnInit should be call #setAllResults", () => {
    spyOn(component, "setAllResults")
    component.ngOnInit()
    expect(component.setAllResults).toHaveBeenCalled()
  })

  it("#ngOnInit should be call #setMyRepos", () => {
    spyOn(service, "setMyRepos")
    component.ngOnInit()
    expect(service.setMyRepos).toHaveBeenCalled()
  })

  it("#getAllResults should be return 1", () => {
    expect(component.getAllResults()).toEqual(1)
  })
})

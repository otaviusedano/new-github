import { ComponentFixture, TestBed } from "@angular/core/testing"

import { ButtonComponent } from "./button.component"

describe("ButtonComponent", () => {
  let component: ButtonComponent
  let fixture: ComponentFixture<ButtonComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents()
    fixture = TestBed.createComponent(ButtonComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it("should created", () => {
    expect(component).toBeTruthy()
  })
})

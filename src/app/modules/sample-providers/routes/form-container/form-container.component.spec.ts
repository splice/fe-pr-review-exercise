import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormContainerComponent } from './form-container.component';

describe('FormContainerComponent', () => {
  let component: FormContainerComponent;
  let fixture: ComponentFixture<FormContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormContainerComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitForm shows success field ', () => {
    expect(component.showSuccess).toBeFalsy();
    component.submitForm({});
    expect(component.showSuccess).toBeTruthy();
  });
});

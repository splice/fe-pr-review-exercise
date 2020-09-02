import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SubmissionFormComponent } from './submission-form.component';

describe('SubmissionFormComponent', () => {
  let component: SubmissionFormComponent;
  let fixture: ComponentFixture<SubmissionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [SubmissionFormComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  describe('contact name field', () => {
    it('field validity', () => {
      const labelName = component.form.controls.label_name;
      expect(labelName.valid).toBeFalsy();

      labelName.setValue('Steve');
      expect(labelName.valid).toBeTruthy();
    });
  });

  describe('contact description field', () => {
    let labelDescription;

    beforeEach(() => {
      labelDescription = component.form.controls.label_description;
    });

    it('field validity', () => {
      expect(labelDescription.valid).toBeFalsy();
      labelDescription.setValue('Like deadmau5 but badg0053');
      expect(labelDescription.valid).toBeTruthy();
    });

    it('returns false for descriptions over 200 characters', () => {
      labelDescription.setValue(
        'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections'
      );
      expect(labelDescription.valid).toBeFalsy();
    });
  });

  describe('contact email field', () => {
    let labelContact;

    beforeEach(() => {
      labelContact = component.form.controls.label_contact;
    });

    it('field validity', () => {
      expect(labelContact.valid).toBeFalsy();
      labelContact.setValue('test@splice.com');
      expect(labelContact.valid).toBeTruthy();
    });

    it('returns false for badly formatted emails', () => {
      labelContact.setValue('s@@.asdsa.sad');
      expect(labelContact.valid).toBeFalsy();
    });
  });
});

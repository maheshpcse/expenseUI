import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleFormsComponent } from './google-forms.component';

describe('GoogleFormsComponent', () => {
  let component: GoogleFormsComponent;
  let fixture: ComponentFixture<GoogleFormsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleFormsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

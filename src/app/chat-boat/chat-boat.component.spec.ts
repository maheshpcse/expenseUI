import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBoatComponent } from './chat-boat.component';

describe('ChatBoatComponent', () => {
  let component: ChatBoatComponent;
  let fixture: ComponentFixture<ChatBoatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBoatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBoatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

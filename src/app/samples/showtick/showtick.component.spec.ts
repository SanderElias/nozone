import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowtickComponent } from './showtick.component';

describe('ShowtickComponent', () => {
  let component: ShowtickComponent;
  let fixture: ComponentFixture<ShowtickComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowtickComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowtickComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

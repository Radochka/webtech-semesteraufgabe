import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WunschlistenPageComponent } from './wunschlisten-page.component';

describe('WunschlistenPageComponent', () => {
  let component: WunschlistenPageComponent;
  let fixture: ComponentFixture<WunschlistenPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WunschlistenPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WunschlistenPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestourantComponent } from './restourant.component';

describe('RestourantComponent', () => {
  let component: RestourantComponent;
  let fixture: ComponentFixture<RestourantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestourantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestourantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

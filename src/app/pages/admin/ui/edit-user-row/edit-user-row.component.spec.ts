import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserRowComponent } from './edit-user-row.component';

describe('EditUserRowComponent', () => {
  let component: EditUserRowComponent;
  let fixture: ComponentFixture<EditUserRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

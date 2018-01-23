import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageHistoryComponent } from './storage-history.component';

describe('StorageHistoryComponent', () => {
  let component: StorageHistoryComponent;
  let fixture: ComponentFixture<StorageHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

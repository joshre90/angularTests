import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BoardAdminPage } from './board-admin.page';

describe('BoardAdminPage', () => {
  let component: BoardAdminPage;
  let fixture: ComponentFixture<BoardAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BoardAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

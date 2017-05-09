import { RestaurantCrudInAngular2ONLYFRONTENDPage } from './app.po';

describe('restaurant-crud-in-angular2-only-frontend App', () => {
  let page: RestaurantCrudInAngular2ONLYFRONTENDPage;

  beforeEach(() => {
    page = new RestaurantCrudInAngular2ONLYFRONTENDPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

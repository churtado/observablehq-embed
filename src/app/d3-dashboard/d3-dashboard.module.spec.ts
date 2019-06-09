import { D3DashboardModule } from './d3-dashboard.module';

describe('D3DashboardModule', () => {
  let d3DashboardModule: D3DashboardModule;

  beforeEach(() => {
    d3DashboardModule = new D3DashboardModule();
  });

  it('should create an instance', () => {
    expect(d3DashboardModule).toBeTruthy();
  });
});

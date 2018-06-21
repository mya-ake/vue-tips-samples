import * as store from '@/helpers/store';

describe('Store helpers', () => {
  it('buildModuleTypes', () => {
    const moduleName = 'user';
    const types = {
      SET_NAME: 'SET_NAME',
      SET_EMAIL: 'SET_EMAIL',
    };

    const moduleTypes = store.buildModuleTypes({ moduleName, types });

    expect(moduleTypes.SET_NAME).toBe('user/SET_NAME');
    expect(moduleTypes.SET_EMAIL).toBe('user/SET_EMAIL');
  });
});

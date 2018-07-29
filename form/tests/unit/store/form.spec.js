import { state, getters, mutations } from '@/store/form';

describe('Form Store', () => {
  let testState;
  beforeEach(() => {
    testState = Object.assign({}, state);
  });

  describe('getters', () => {
    it('VALUES, initial', () => {
      const values = getters.VALUES(testState);
      expect(values).toEqual({});
    });

    it('VALUES, after mutation', () => {
      testState.values = {
        name: 'test value name',
        body: 'test value body',
      };
      const values = getters.VALUES(testState);

      expect(values).toEqual(testState.values);
    });
  });

  describe('mutations', () => {
    it('SET_VALUES', () => {
      const values = {
        name: 'test value name',
        body: 'test value body',
      };
      mutations.SET_VALUES(testState, values);

      expect(testState.values).toEqual(values);
    });

    it('CLEAR_VALUES', () => {
      testState.values = {
        name: 'test value name',
        body: 'test value body',
      };

      mutations.CLEAR_VALUES(testState);

      expect(testState.values).toBeNull();
    });
  });
});

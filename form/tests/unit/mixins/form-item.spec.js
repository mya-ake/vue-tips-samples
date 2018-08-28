import { shallowMount } from '@vue/test-utils';
import FormItemComponent from '~resources/components/FormItem';
import { BaseFormItem } from '@/lib';

/** utils */
const cloneInstance = instance => {
  return Object.assign(
    Object.create(Object.getPrototypeOf(instance)),
    instance,
  );
};

class InputProcess {
  constructor(wrapper, formItem) {
    this._wrapper = wrapper;
    this._input = wrapper.find('input');
    this._formItem = formItem;
  }

  input(value) {
    this._input.setValue(value);
    const formItem = cloneInstance(this._formItem);
    formItem._createObserver();
    formItem.value = value;

    this._formItem = formItem;
    this._wrapper.setProps({
      value,
      formItem,
    });
  }
}

const emptyValidator = {
  message: '入力禁止',
  validator(value) {
    return value === '';
  },
};

/** test */
describe('mixins/form-item', () => {
  describe('Initialize', () => {
    let formItem;
    beforeEach(() => {
      formItem = new BaseFormItem();
    });

    it('mount', () => {
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      expect(wrapper.isVueInstance()).toBe(true);
    });

    it('nameAttr, name props がない場合 id が入る', () => {
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test-id',
          label: 'test',
          formItem,
        },
      });

      expect(wrapper.vm.nameAttr).toBe('test-id');
    });

    it('nameAttr, name props がある場合 name props が入る', () => {
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test-id',
          name: 'test-name',
          label: 'test',
          formItem,
        },
      });

      expect(wrapper.vm.nameAttr).toBe('test-name');
    });
  });

  describe('Events', () => {
    let formItem;
    beforeEach(() => {
      formItem = new BaseFormItem();
    });

    it('value が変更されたら input で値が emit される', () => {
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const input = wrapper.find('input');
      input.setValue('a');

      expect.assertions(2);
      expect(wrapper.emitted('input')).toHaveLength(1);
      expect(wrapper.emitted('input')[0]).toEqual(['a']);
    });

    it('blur されると validate が呼ばれる', () => {
      const validate = formItem.validate;
      const mockValidate = jest.fn();
      formItem.validate = () => {
        validate.call(formItem);
        mockValidate();
      };

      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const input = wrapper.find('input');
      input.trigger('blur');

      expect(mockValidate.mock.calls).toHaveLength(1);
    });
  });

  describe('States', () => {
    let formItem;
    beforeEach(() => {
      formItem = new BaseFormItem();
    });

    it('blur されると toutched となる', () => {
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const input = wrapper.find('input');
      input.trigger('blur');

      expect(wrapper.vm.isTouched).toBe(true);
    });

    it('dirty の 後に blur されると touchedAfterDirty となる', () => {
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const input = wrapper.find('input');
      const inputProcess = new InputProcess(wrapper, formItem);

      inputProcess.input('a');

      expect(wrapper.vm.isTouchedAfterDirty).toBe(false);

      input.trigger('blur');

      expect(wrapper.vm.isTouchedAfterDirty).toBe(true);
    });

    it('resetStates を呼ぶと states が初期値になる', () => {
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const initialStates = { ...wrapper.vm.states };
      const inputProcess = new InputProcess(wrapper, formItem);

      inputProcess.input('a');
      wrapper.find('input').trigger('blur');

      wrapper.vm.resetStates();

      expect.assertions(2);
      expect(wrapper.vm.states).toEqual(initialStates);
      expect(wrapper.vm.isDirty).toBe(false);
    });

    it('エラーが存在するとき messages にエラーメッセージが入っている', () => {
      formItem.addValidator(emptyValidator);
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const inputProcess = new InputProcess(wrapper, formItem);
      inputProcess.input('a');

      expect(wrapper.vm.messages).toEqual([emptyValidator.message]);
    });

    it('エラーが存在するとき invalid が true となっている', () => {
      formItem.addValidator(emptyValidator);
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const inputProcess = new InputProcess(wrapper, formItem);
      inputProcess.input('a');

      expect(wrapper.vm.invalid).toBe(true);
    });

    it('dirty props が設定されているとき、入力されてから showError が true になる', () => {
      formItem = new BaseFormItem('a').addValidator(emptyValidator).validate();
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
          dirty: true,
        },
      });

      expect.assertions(4);
      expect(wrapper.vm.invalid).toBe(true);
      expect(wrapper.vm.showError).toBe(false);

      const inputProcess = new InputProcess(wrapper, formItem);
      inputProcess.input('aa');

      expect(wrapper.vm.invalid).toBe(true);
      expect(wrapper.vm.showError).toBe(true);
    });

    it('touched props が設定されているとき、blurされてから showError が true になる', () => {
      formItem = new BaseFormItem('a').addValidator(emptyValidator).validate();
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
          touched: true,
        },
      });

      expect.assertions(4);
      expect(wrapper.vm.invalid).toBe(true);
      expect(wrapper.vm.showError).toBe(false);

      const input = wrapper.find('input');
      input.trigger('blur');

      expect(wrapper.vm.invalid).toBe(true);
      expect(wrapper.vm.showError).toBe(true);
    });

    it('touchedAfterDirty props が設定されているとき、入力がされ、blur されてから showError が true になる', () => {
      formItem = new BaseFormItem('a').addValidator(emptyValidator).validate();
      const wrapper = shallowMount(FormItemComponent, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
          touchedAfterDirty: true,
        },
      });

      expect.assertions(6);
      expect(wrapper.vm.invalid).toBe(true);
      expect(wrapper.vm.showError).toBe(false);

      const inputProcess = new InputProcess(wrapper, formItem);
      inputProcess.input('aa');

      expect(wrapper.vm.invalid).toBe(true);
      expect(wrapper.vm.showError).toBe(false);

      const input = wrapper.find('input');
      input.trigger('blur');

      expect(wrapper.vm.invalid).toBe(true);
      expect(wrapper.vm.showError).toBe(true);
    });
  });
});

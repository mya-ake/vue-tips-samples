import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

import { FormSelect } from '@/components';
import { BaseSelectFormItem } from '@/forms';

class SelectProcess {
  constructor(wrapper) {
    this._wrapper = wrapper;
    this._select = this._wrapper.find('select');
    this._options = this._select.findAll('option');
    this._callCount = 0;
  }

  async select(value) {
    this._extractMatchValueOption(value).setSelected(); // 選択状態の更新
    this._select.trigger('input'); // inputイベント発火
    this._wrapper.setProps({
      value: this._wrapper.emitted().input[this._callCount][0], // 親のv-modelから値が返ってくることを想定
    });
    this._callCount++;
    await Vue.nextTick();
  }

  _extractMatchValueOption(value) {
    return this._options
      .filter(wrapper => wrapper.element.value === value)
      .at(0);
  }
}

class BasicSelectFormItem extends BaseSelectFormItem {
  constructor(value) {
    super(value);
    this.options = [
      { text: 'test value 1', value: 'test1' },
      { text: 'test value 2', value: 'test2' },
    ];
  }

  validator() {
    const messages = [];
    if (this.value.length === 0) {
      messages.push(BasicSelectFormItem.MESSAGES.EMPTY);
      return messages;
    }
    if (this.options.some(option => this.value === option.value) === false) {
      messages.push(BasicSelectFormItem.MESSAGES.INVALID);
    }
    return messages;
  }
}
BasicSelectFormItem.MESSAGES = {
  EMPTY: '選択してください',
  INVALID: '不正な操作が必要な行われました',
};

describe('FormSelect', () => {
  describe('Initialize', () => {
    it('only requred', () => {
      const formItem = new BasicSelectFormItem('');
      const props = {
        id: 'select',
        label: 'Select',
        formItem,
        value: formItem.value,
      };
      const wrapper = shallowMount(FormSelect, {
        propsData: props,
      });

      const label = wrapper.find('label');
      const select = wrapper.find('select');

      expect.assertions(6);
      expect(label.text()).toBe(props.label);
      expect(label.attributes().for).toBe(select.attributes().id);
      expect(select.attributes().name).toBe(props.id);
      expect(select.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll('option').wrappers).toHaveLength(3);
      expect(wrapper.findAll('li').wrappers).toHaveLength(0);
    });

    it('basic props', () => {
      const formItem = new BasicSelectFormItem('');
      const props = {
        id: 'select',
        label: 'Select',
        name: 'select-name',
        formItem,
        value: formItem.value,
      };
      const wrapper = shallowMount(FormSelect, {
        propsData: props,
      });

      const label = wrapper.find('label');
      const select = wrapper.find('select');

      expect.assertions(6);
      expect(label.text()).toBe(props.label);
      expect(label.attributes().for).toBe(select.attributes().id);
      expect(select.attributes().name).toBe(props.name);
      expect(select.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll('option').wrappers).toHaveLength(3);
      expect(wrapper.findAll('li').wrappers).toHaveLength(0);
    });

    it('initial validate', async () => {
      const formItem = new BasicSelectFormItem('a');
      const props = {
        id: 'select',
        label: 'Select',
        formItem,
        value: formItem.value,
        initialValidation: true,
      };
      const wrapper = shallowMount(FormSelect, {
        propsData: props,
      });

      const select = wrapper.find('select');

      await Vue.nextTick();
      expect.assertions(3);
      expect(wrapper.find('li').text()).toBe(
        BasicSelectFormItem.MESSAGES.INVALID,
      );
      expect(select.classes()).toContain('has-error');
      expect(wrapper.emitted().notify).toHaveLength(1);
    });
  });

  describe('Events', () => {
    let wrapper;
    let props;
    const propsBuilder = () => {
      const formItem = new BasicSelectFormItem('');
      return {
        id: 'item1',
        label: 'Item1',
        formItem,
        value: formItem.value,
      };
    };
    beforeEach(() => {
      props = propsBuilder();
      wrapper = shallowMount(FormSelect, {
        propsData: props,
      });
    });

    it('input', async () => {
      const selectValue = 'test1';

      const selectProcess = new SelectProcess(wrapper);
      await selectProcess.select(selectValue);

      expect.assertions(2);
      expect(wrapper.emitted().input).toHaveLength(1);
      expect(wrapper.emitted().input[0][0]).toBe(selectValue);
    });

    it('notify', async () => {
      const selectProcess = new SelectProcess(wrapper);
      await selectProcess.select('test1');

      expect.assertions(2);
      expect(wrapper.emitted().notify).toHaveLength(1);
      expect(wrapper.emitted().notify[0][0]).toEqual({
        name: props.id,
        result: true,
      });
    });
  });

  describe('Validate', () => {
    const props = {
      id: 'item1',
      label: 'Item1',
    };

    it('dirty attr, 選択が一度されてからバリデーションを行う', async () => {
      const formItem = new BasicSelectFormItem('a');
      const wrapper = shallowMount(FormSelect, {
        propsData: {
          ...props,
          formItem,
          value: formItem.value,
          dirty: true,
        },
      });

      const selectProcess = new SelectProcess(wrapper);
      const select = wrapper.find('select');
      const messages = wrapper.find('ul');

      expect.assertions(4);
      expect(select.classes()).not.toContain('has-error');
      expect(messages.isVisible()).toBe(false);

      await selectProcess.select('');

      expect(select.classes()).toContain('has-error');
      expect(messages.isVisible()).toBe(true);
    });

    it('Touched attr, selectのフォーカスが離れてからバリデーションを行う', async () => {
      const formItem = new BasicSelectFormItem('');
      const wrapper = shallowMount(FormSelect, {
        propsData: {
          ...props,
          formItem,
          value: formItem.value,
          touched: true,
        },
      });

      const selectProcess = new SelectProcess(wrapper);
      const select = wrapper.find('select');
      const messages = wrapper.find('ul');

      await selectProcess.select('test1');

      expect.assertions(6);
      expect(select.classes()).not.toContain('has-error');
      expect(messages.isVisible()).toBe(false);

      await selectProcess.select('');

      expect(select.classes()).not.toContain('has-error');
      expect(messages.isVisible()).toBe(false);

      select.trigger('blur');

      expect(select.classes()).toContain('has-error');
      expect(messages.isVisible()).toBe(true);
    });
  });
});

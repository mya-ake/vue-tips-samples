import Vue from 'vue';
import { shallowMount } from '@vue/test-utils';

import { FormInput } from '@/components';
import { BaseFormItem } from '@/models';

class InputProcess {
  constructor(wrapper) {
    this._wrapper = wrapper;
    this._input = this._wrapper.find('input');
    this._callCount = 0;
  }

  async input(value) {
    this._input.setValue(value);
    this._wrapper.setProps({
      value: this._wrapper.emitted().input[this._callCount][0], // 親のv-modelから値が返ってくることを想定
    });
    this._callCount++;
    await Vue.nextTick();
  }
}

class EmptyFormItem extends BaseFormItem {
  validator() {
    const messages = [];
    if (this.value.length > 0) {
      messages.push(EmptyFormItem.MESSAGES.INPUT_PROHIBITION);
    }
    return messages;
  }
}
EmptyFormItem.MESSAGES.INPUT_PROHIBITION = '入力禁止';

class StringFormItem extends BaseFormItem {
  validator() {
    const messages = [];
    if (this.value.length === 0) {
      messages.push(StringFormItem.MESSAGES.EMPTY);
    }
    return messages;
  }
}
StringFormItem.MESSAGES.EMPTY = 'empty';

describe('FormInput', () => {
  describe('Initialize', () => {
    it('only requred', () => {
      const formItem = new BaseFormItem('a');
      const props = {
        id: 'search',
        label: 'Search',
        formItem,
        value: formItem.value,
      };
      const wrapper = shallowMount(FormInput, {
        propsData: props,
      });

      const label = wrapper.find('label');
      const input = wrapper.find('input');

      expect.assertions(6);
      expect(label.text()).toBe(props.label);
      expect(label.attributes().for).toBe(input.attributes().id);
      expect(input.attributes().name).toBe(props.id);
      expect(input.attributes().type).toBe('text');
      expect(input.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll('li').wrappers).toHaveLength(0);
    });

    it('basic props', () => {
      const formItem = new BaseFormItem('keyword');
      const props = {
        id: 'search',
        name: 'search-input',
        type: 'search',
        label: 'Search',
        formItem,
        value: formItem.value,
      };
      const wrapper = shallowMount(FormInput, {
        propsData: props,
      });

      const label = wrapper.find('label');
      const input = wrapper.find('input');

      expect.assertions(6);
      expect(label.text()).toBe(props.label);
      expect(label.attributes().for).toBe(input.attributes().id);
      expect(input.attributes().name).toBe(props.name);
      expect(input.attributes().type).toBe(props.type);
      expect(input.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll('li').wrappers).toHaveLength(0);
    });

    it('initial validate, boolean true', async () => {
      const formItem = new EmptyFormItem('a');
      const props = {
        id: 'search',
        label: 'Search',
        formItem,
        value: formItem.value,
        initialValidation: true,
      };
      const wrapper = shallowMount(FormInput, {
        propsData: props,
      });

      const input = wrapper.find('input');

      await Vue.nextTick();
      expect.assertions(3);
      expect(wrapper.find('li').text()).toBe(
        EmptyFormItem.MESSAGES.INPUT_PROHIBITION,
      );
      expect(input.classes()).toContain('has-error');
      expect(wrapper.emitted().notify).toHaveLength(1);
    });

    it('initial validate, boolean false', async () => {
      const formItem = new EmptyFormItem('a');
      const props = {
        id: 'search',
        label: 'Search',
        formItem,
        value: formItem.value,
        initialValidation: false,
      };
      const wrapper = shallowMount(FormInput, {
        propsData: props,
      });

      const input = wrapper.find('input');
      const messages = wrapper.find('ul');

      await Vue.nextTick();
      expect.assertions(3);
      expect(messages.isVisible()).toBe(false);
      expect(input.classes()).not.toContain('has-error');
      expect(wrapper.emitted().notify).toBeUndefined();
    });
  });

  describe('Events', () => {
    let wrapper;
    let props;
    const propsBuilder = () => {
      const formItem = new EmptyFormItem('');
      return {
        id: 'item1',
        label: 'Item1',
        formItem,
        value: formItem.value,
      };
    };

    beforeEach(() => {
      props = propsBuilder();
      wrapper = shallowMount(FormInput, {
        propsData: props,
      });
    });

    it('input', () => {
      const inputText = 'test text';

      const input = wrapper.find('input');
      input.setValue(inputText);

      expect.assertions(2);
      expect(wrapper.emitted().input).toHaveLength(1);
      expect(wrapper.emitted().input[0][0]).toBe(inputText);
    });

    it('notify', async () => {
      const inputProcess = new InputProcess(wrapper);
      await inputProcess.input('test value');

      expect.assertions(2);
      expect(wrapper.emitted().notify).toHaveLength(1);
      expect(wrapper.emitted().notify[0][0]).toEqual({
        name: props.id,
        result: false,
      });
    });
  });

  describe('Validation, props', () => {
    const props = {
      id: 'item1',
      label: 'Item1',
    };

    it('dirty attr, 値が変更されてからバリデーションを行う', async () => {
      const formItem = new EmptyFormItem('');
      const wrapper = shallowMount(FormInput, {
        propsData: {
          ...props,
          formItem,
          value: formItem.value,
          dirty: true,
        },
      });

      const inputProcess = new InputProcess(wrapper);
      const input = wrapper.find('input');
      const messages = wrapper.find('ul');

      expect.assertions(4);
      expect(input.classes()).not.toContain('has-error');
      expect(messages.isVisible()).toBe(false);

      await inputProcess.input('a');

      expect(input.classes()).toContain('has-error');
      expect(messages.isVisible()).toBe(true);
    });

    it('Touched attr, inputのフォーカスが離れてからバリデーションを行う', async () => {
      const formItem = new EmptyFormItem('');
      const wrapper = shallowMount(FormInput, {
        propsData: {
          ...props,
          formItem,
          value: formItem.value,
          touched: true,
        },
      });

      const inputProcess = new InputProcess(wrapper);
      const input = wrapper.find('input');
      const messages = wrapper.find('ul');

      await inputProcess.input('a');

      expect.assertions(6);
      expect(input.classes()).not.toContain('has-error');
      expect(messages.isVisible()).toBe(false);

      await inputProcess.input('aa');

      expect(input.classes()).not.toContain('has-error');
      expect(messages.isVisible()).toBe(false);

      input.trigger('blur');

      expect(input.classes()).toContain('has-error');
      expect(messages.isVisible()).toBe(true);
    });

    it('Touched after dirty attr, 値が変更された後にinputのフォーカスが離れてからバリデーションを行う', async () => {
      const formItem = new EmptyFormItem('');
      const wrapper = shallowMount(FormInput, {
        propsData: {
          ...props,
          formItem,
          value: formItem.value,
          touchedAfterDirty: true,
        },
      });

      const inputProcess = new InputProcess(wrapper);
      const input = wrapper.find('input');
      const messages = wrapper.find('ul');

      expect.assertions(6);

      input.trigger('blur');
      expect(input.classes()).not.toContain('has-error');
      expect(messages.isVisible()).toBe(false);

      await inputProcess.input('a');

      expect(input.classes()).not.toContain('has-error');
      expect(messages.isVisible()).toBe(false);

      input.trigger('blur');

      expect(input.classes()).toContain('has-error');
      expect(messages.isVisible()).toBe(true);
    });
  });
});

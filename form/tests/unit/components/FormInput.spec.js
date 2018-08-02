import { shallowMount } from '@vue/test-utils';

import { FormInput } from '@/components';
import { BaseFormItem } from '@/lib';

describe('FormInput', () => {
  describe('Initialize', () => {
    let formItem;
    beforeEach(() => {
      formItem = new BaseFormItem();
    });

    it('mount', () => {
      const wrapper = shallowMount(FormInput, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      expect(wrapper.isVueInstance()).toBe(true);
    });

    it('basic props', () => {
      const props = {
        value: formItem.value,
        id: 'test-id',
        name: 'test-name',
        label: 'test-label',
        formItem,
      };
      const wrapper = shallowMount(FormInput, {
        propsData: props,
      });

      const label = wrapper.find('label');
      const labelAttributes = label.attributes();
      const input = wrapper.find('input');
      const inputAttributes = input.attributes();

      expect.assertions(6);
      expect(label.text()).toBe(props.label);
      expect(labelAttributes.for).toBe(props.id);
      expect(inputAttributes.type).toBe('text');
      expect(inputAttributes.name).toBe(props.name);
      expect(input.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll('li').wrappers).toHaveLength(0);
    });

    it('type props によって input タグの type が設定される', () => {
      const wrapper = shallowMount(FormInput, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
          type: 'password',
        },
      });

      const input = wrapper.find('input');

      expect(input.attributes().type).toBe('password');
    });

    it('input のイベントハンドラーが設定されているか', () => {
      const wrapper = shallowMount(FormInput, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const input = wrapper.find('input');
      input.trigger('input');

      expect(wrapper.emitted('input')).toHaveLength(1);
    });

    it('blur のイベントハンドラーが設定されているか', () => {
      const mockValidate = jest.fn();
      formItem.validate = mockValidate;
      const wrapper = shallowMount(FormInput, {
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
});

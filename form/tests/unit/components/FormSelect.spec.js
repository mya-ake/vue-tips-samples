import { shallowMount } from '@vue/test-utils';

import { FormSelect } from '@/components';
import { BaseSelectFormItem } from '@/lib';

describe('FormSelect', () => {
  describe('Initialize', () => {
    let formItem;
    beforeEach(() => {
      formItem = new BaseSelectFormItem();
    });

    it('mount', () => {
      const wrapper = shallowMount(FormSelect, {
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
        label: 'test-label',
        formItem,
      };
      const wrapper = shallowMount(FormSelect, {
        propsData: props,
      });

      const label = wrapper.find('label');
      const labelAttributes = label.attributes();
      const select = wrapper.find('select');
      const selectAttributes = select.attributes();

      expect.assertions(5);
      expect(label.text()).toBe(props.label);
      expect(labelAttributes.for).toBe(props.id);
      expect(selectAttributes.name).toBe(props.id);
      expect(select.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll('li').wrappers).toHaveLength(0);
    });

    it('input のイベントハンドラーが設定されているか', () => {
      const wrapper = shallowMount(FormSelect, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const select = wrapper.find('select');
      select.trigger('input');

      expect(wrapper.emitted('input')).toHaveLength(1);
    });

    it('blur のイベントハンドラーが設定されているか', () => {
      const mockValidate = jest.fn();
      formItem.validate = mockValidate;
      const wrapper = shallowMount(FormSelect, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const select = wrapper.find('select');
      select.trigger('blur');

      expect(mockValidate.mock.calls).toHaveLength(1);
    });
  });
});

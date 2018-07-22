import { shallowMount } from '@vue/test-utils';

import { FormTextarea } from '@/components';
import { BaseFormItem } from '@/lib';

describe('FormTextarea', () => {
  describe('Initialize', () => {
    let formItem;
    beforeEach(() => {
      formItem = new BaseFormItem();
    });

    it('mount', () => {
      const wrapper = shallowMount(FormTextarea, {
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
      const wrapper = shallowMount(FormTextarea, {
        propsData: props,
      });

      const label = wrapper.find('label');
      const labelAttributes = label.attributes();
      const textarea = wrapper.find('textarea');
      const textareaAttributes = textarea.attributes();

      expect.assertions(5);
      expect(label.text()).toBe(props.label);
      expect(labelAttributes.for).toBe(props.id);
      expect(textareaAttributes.name).toBe(props.id);
      expect(textarea.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll('li').wrappers).toHaveLength(0);
    });

    it('input のイベントハンドラーが設定されているか', () => {
      const wrapper = shallowMount(FormTextarea, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const textarea = wrapper.find('textarea');
      textarea.trigger('input');

      expect(wrapper.emitted('input')).toHaveLength(1);
    });

    it('blur のイベントハンドラーが設定されているか', () => {
      const mockValidate = jest.fn();
      formItem.validate = mockValidate;
      const wrapper = shallowMount(FormTextarea, {
        propsData: {
          value: formItem.value,
          id: 'test',
          label: 'test',
          formItem,
        },
      });

      const textarea = wrapper.find('textarea');
      textarea.trigger('blur');

      expect(mockValidate.mock.calls).toHaveLength(1);
    });
  });
});

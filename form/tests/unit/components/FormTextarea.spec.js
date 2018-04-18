import Vue from "vue";
import { shallow } from "@vue/test-utils";

import { FormTextarea } from "@/components";
import { BaseFormItem } from "@/models";

class TextareaProcess {
  constructor(wrapper) {
    this._wrapper = wrapper;
    this._textarea = this._wrapper.find("textarea");
    this._callCount = 0;
  }

  async input(value) {
    this._textarea.element.value = value; // 入力
    this._textarea.trigger("input"); // inputイベント発火
    this._wrapper.vm.formItem.value = this._wrapper.emitted().input[
      this._callCount
    ][0]; // 親のv-modelから値が返ってくることを想定
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
EmptyFormItem.MESSAGES.INPUT_PROHIBITION = "入力禁止";

class StringFormItem extends BaseFormItem {
  validator() {
    const messages = [];
    if (this.value.length === 0) {
      messages.push(StringFormItem.MESSAGES.EMPTY);
    }
    return messages;
  }
}
StringFormItem.MESSAGES.EMPTY = "empty";

describe("FormTextarea", () => {
  describe("Initialize", () => {
    it("only requred", () => {
      const props = {
        id: "textarea",
        label: "Content",
        formItem: new BaseFormItem("a")
      };
      const wrapper = shallow(FormTextarea, {
        propsData: props
      });

      const label = wrapper.find("label");
      const textarea = wrapper.find("textarea");

      expect.assertions(4);
      expect(label.text()).toBe(props.label);
      expect(textarea.attributes().name).toBe(props.id);
      expect(textarea.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll("li").wrappers).toHaveLength(0);
    });

    it("basic props", () => {
      const props = {
        id: "textarea",
        name: "textarea-input",
        label: "Content",
        placeholder: "e.g. vue.js",
        cols: 10,
        rows: 20,
        required: "",
        maxlength: 100,
        formItem: new BaseFormItem("keyword")
      };
      const wrapper = shallow(FormTextarea, {
        propsData: props
      });

      const label = wrapper.find("label");
      const textarea = wrapper.find("textarea");

      expect.assertions(9);
      expect(label.text()).toBe(props.label);
      expect(textarea.attributes().name).toBe(props.name);
      expect(textarea.attributes().placeholder).toBe(props.placeholder);
      expect(textarea.attributes().cols).toBe(String(props.cols));
      expect(textarea.attributes().rows).toBe(String(props.rows));
      expect(textarea.attributes().required).not.toBeUndefined();
      expect(textarea.attributes().maxlength).toBe(String(props.maxlength));
      expect(textarea.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll("li").wrappers).toHaveLength(0);
    });

    it("validate", async () => {
      const props = {
        id: "textarea",
        label: "Content",
        formItem: new EmptyFormItem("a"),
        initialValidation: ""
      };
      const wrapper = shallow(FormTextarea, {
        propsData: props
      });

      const textarea = wrapper.find("textarea");

      await Vue.nextTick();
      expect.assertions(2);
      expect(wrapper.find("li").text()).toBe(
        EmptyFormItem.MESSAGES.INPUT_PROHIBITION
      );
      expect(textarea.classes()).toContain("has-error");
    });
  });

  describe("Events", () => {
    let wrapper;
    const props = {
      id: "item1",
      label: "Content",
      formItem: new EmptyFormItem("")
    };
    beforeEach(() => {
      wrapper = shallow(FormTextarea, {
        propsData: props
      });
    });

    it("input", () => {
      const inputText = "test text";

      const textarea = wrapper.find("textarea");
      textarea.element.value = inputText;
      textarea.trigger("input");

      expect.assertions(2);
      expect(wrapper.emitted().input).toHaveLength(1);
      expect(wrapper.emitted().input[0][0]).toBe(inputText);
    });

    it("notify", async () => {
      const textareaProcess = new TextareaProcess(wrapper);
      await textareaProcess.input("test value");

      expect.assertions(2);
      expect(wrapper.emitted().notify).toHaveLength(1);
      expect(wrapper.emitted().notify[0][0]).toEqual({
        name: props.id,
        result: false
      });
    });
  });

  describe("Validate", () => {
    const props = {
      id: "item1",
      label: "Content"
    };

    it("dirty attr, 値が変更されてからバリデーションを行う", async () => {
      const wrapper = shallow(FormTextarea, {
        propsData: {
          ...props,
          formItem: new EmptyFormItem(""),
          dirty: "",
          initialValidation: ""
        }
      });

      const textareaProcess = new TextareaProcess(wrapper);
      const textarea = wrapper.find("textarea");
      const messages = wrapper.find("ul");

      expect.assertions(4);
      expect(textarea.classes()).not.toContain("has-error");
      expect(messages.isVisible()).toBe(false);

      await textareaProcess.input("a");

      expect(textarea.classes()).toContain("has-error");
      expect(messages.isVisible()).toBe(true);
    });

    it("Touched attr, inputのフォーカスが離れてからバリデーションを行う", async () => {
      const wrapper = shallow(FormTextarea, {
        propsData: {
          ...props,
          formItem: new EmptyFormItem(""),
          touched: ""
        }
      });

      const textareaProcess = new TextareaProcess(wrapper);
      const textarea = wrapper.find("textarea");
      const messages = wrapper.find("ul");

      await textareaProcess.input("a");

      expect.assertions(6);
      expect(textarea.classes()).not.toContain("has-error");
      expect(messages.isVisible()).toBe(false);

      await textareaProcess.input("aa");

      expect(textarea.classes()).not.toContain("has-error");
      expect(messages.isVisible()).toBe(false);

      textarea.trigger("blur");

      expect(textarea.classes()).toContain("has-error");
      expect(messages.isVisible()).toBe(true);
    });
  });
});

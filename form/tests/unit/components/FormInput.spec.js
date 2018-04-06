import Vue from "vue";
import { shallow } from "@vue/test-utils";

import { FormInput } from "@/components";
import { BaseFormItem } from "@/models";

class InputProcess {
  constructor(wrapper) {
    this._wrapper = wrapper;
    this._input = this._wrapper.find("input");
    this._callCount = 0;
  }

  async input(value) {
    this._input.element.value = value; // 入力
    this._input.trigger("input"); // inputイベント発火
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

describe("FormInput", () => {
  describe("Initialize", () => {
    it("only requred", () => {
      const props = {
        id: "search",
        label: "Search",
        formItem: new BaseFormItem("a")
      };
      const wrapper = shallow(FormInput, {
        propsData: props
      });

      const label = wrapper.find("label");
      const input = wrapper.find("input");

      expect.assertions(6);
      expect(label.text()).toBe(props.label);
      expect(label.attributes().for).toBe(input.attributes().id);
      expect(input.attributes().name).toBe(props.id);
      expect(input.attributes().type).toBe("text");
      expect(input.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll("li").wrappers).toHaveLength(0);
    });

    it("basic props", () => {
      const props = {
        id: "search",
        name: "search-input",
        type: "search",
        label: "Search",
        placeholder: "e.g. vue.js",
        required: "",
        formItem: new BaseFormItem("keyword")
      };
      const wrapper = shallow(FormInput, {
        propsData: props
      });

      const label = wrapper.find("label");
      const input = wrapper.find("input");

      expect.assertions(8);
      expect(label.text()).toBe(props.label);
      expect(label.attributes().for).toBe(input.attributes().id);
      expect(input.attributes().name).toBe(props.name);
      expect(input.attributes().type).toBe(props.type);
      expect(input.attributes().placeholder).toBe(props.placeholder);
      expect(input.attributes().required).not.toBeUndefined();
      expect(input.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll("li").wrappers).toHaveLength(0);
    });

    it("initial validate", async () => {
      const props = {
        id: "search",
        label: "Search",
        formItem: new EmptyFormItem("a"),
        initialValidate: ""
      };
      const wrapper = shallow(FormInput, {
        propsData: props
      });

      const input = wrapper.find("input");

      await Vue.nextTick();
      expect.assertions(3);
      expect(wrapper.find("li").text()).toBe(
        EmptyFormItem.MESSAGES.INPUT_PROHIBITION
      );
      expect(input.classes()).toContain("has-error");
      expect(wrapper.emitted().notify).toHaveLength(1);
    });
  });

  describe("Events", () => {
    let wrapper;
    const props = {
      id: "item1",
      label: "Item1",
      formItem: new EmptyFormItem("")
    };
    beforeEach(() => {
      wrapper = shallow(FormInput, {
        propsData: props
      });
    });

    it("input", () => {
      const inputText = "test text";

      const input = wrapper.find("input");
      input.element.value = inputText;
      input.trigger("input");

      expect.assertions(2);
      expect(wrapper.emitted().input).toHaveLength(1);
      expect(wrapper.emitted().input[0]).toEqual([inputText]);
    });

    it("notify", async () => {
      const inputProcess = new InputProcess(wrapper);
      await inputProcess.input("test value");

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
      label: "Item1"
    };

    it("dirty attr, 入力が一度されてからバリデーションを行う", async () => {
      const wrapper = shallow(FormInput, {
        propsData: {
          ...props,
          formItem: new EmptyFormItem(""),
          dirty: ""
        }
      });

      const inputProcess = new InputProcess(wrapper);
      const input = wrapper.find("input");
      const messages = wrapper.find("ul");

      await inputProcess.input("a");

      expect.assertions(4);
      expect(input.classes()).not.toContain("has-error");
      expect(messages.isVisible()).toBeFalsy();

      await inputProcess.input("aa");

      expect(input.classes()).toContain("has-error");
      expect(messages.isVisible()).toBeTruthy();
    });

    it("Touched attr, inputのフォーカスが離れてからバリデーションを行う", async () => {
      const wrapper = shallow(FormInput, {
        propsData: {
          ...props,
          formItem: new EmptyFormItem(""),
          touched: ""
        }
      });

      const inputProcess = new InputProcess(wrapper);
      const input = wrapper.find("input");
      const messages = wrapper.find("ul");

      await inputProcess.input("a");

      expect.assertions(6);
      expect(input.classes()).not.toContain("has-error");
      expect(messages.isVisible()).toBeFalsy();

      await inputProcess.input("aa");

      expect(input.classes()).not.toContain("has-error");
      expect(messages.isVisible()).toBeFalsy();

      input.trigger("blur");

      expect(input.classes()).toContain("has-error");
      expect(messages.isVisible()).toBeTruthy();
    });
  });
});

import Vue from "vue";
import { shallow } from "@vue/test-utils";

import { FormInput } from "@/components";
import { FormObserver } from "@/lib";

class InputProcess {
  constructor(wrapper) {
    this._wrapper = wrapper;
    this._input = this._wrapper.find("input");
    this._count = 0;
  }

  async input(value) {
    this._input.element.value = value; // 入力
    this._input.trigger("input"); // inputイベント発火
    this._wrapper.vm.value = this._wrapper.emitted().input[this._count][0]; // 親のv-modelから値が返ってくる
    this._count++;
    await Vue.nextTick();
  }
}

describe("FormInput", () => {
  describe("Initialize", () => {
    it("only requred", () => {
      const props = {
        id: "search",
        label: "Search",
        formObserver: new FormObserver(["search"])
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
      expect(input.element.value).toBe("");
      expect(wrapper.findAll("li").wrappers).toHaveLength(0);
    });

    it("all props", () => {
      const props = {
        id: "search",
        name: "search-input",
        type: "search",
        label: "Search",
        value: "keyword",
        placeholder: "e.g. vue.js",
        required: "",
        formObserver: new FormObserver(["search"])
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
      expect(input.element.value).toBe(props.value);
      expect(wrapper.findAll("li").wrappers).toHaveLength(0);
    });

    it("validate", async () => {
      const message = "入力禁止";
      const props = {
        id: "search",
        label: "Search",
        value: "a",
        formObserver: new FormObserver(["search"]),
        initialValidate: "",
        validator(value) {
          const messages = [];
          if (value.length > 0) {
            messages.push(message);
          }
          return messages;
        }
      };
      const wrapper = shallow(FormInput, {
        propsData: props
      });

      const input = wrapper.find("input");

      await Vue.nextTick();
      expect.assertions(2);
      expect(wrapper.find("li").text()).toBe(message);
      expect(input.classes()).toContain("has-error");
    });
  });

  describe("Events", () => {
    let wrapper;
    beforeEach(() => {
      const props = {
        id: "item1",
        label: "Item1",
        formObserver: new FormObserver(["item1"])
      };
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
  });

  describe("Validate", () => {
    let formObserver;
    const message = "empty";
    const props = {
      id: "item1",
      label: "Item1",
      validator(value) {
        const messages = [];
        if (value.length === 0) {
          messages.push(message);
        }
        return messages;
      }
    };
    beforeEach(() => {
      formObserver = new FormObserver(["item1"]);
    });

    it("FormObserver", async () => {
      const wrapper = shallow(FormInput, {
        propsData: {
          ...props,
          formObserver
        }
      });
      const inputProcess = new InputProcess(wrapper);

      await inputProcess.input("test value");

      expect(formObserver.hasError).toBeFalsy();
    });

    it("dirty attr, 入力が一度されてからバリデーションを行う", async () => {
      const wrapper = shallow(FormInput, {
        propsData: {
          ...props,
          formObserver,
          dirty: "",
          validator(value) {
            const messages = [];
            if (value.length > 0) {
              messages.push("入力禁止");
            }
            return messages;
          }
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
          formObserver,
          touched: "",
          validator(value) {
            const messages = [];
            if (value.length > 0) {
              messages.push("入力禁止");
            }
            return messages;
          }
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

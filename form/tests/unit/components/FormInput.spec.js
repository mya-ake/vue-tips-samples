import { shallow } from "@vue/test-utils";

import { FormInput } from "@/components";
import { FormObserver } from "@/lib";

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

    it("validator", () => {
      const wrapper = shallow(FormInput, {
        propsData: {
          ...props,
          formObserver
        }
      });

      const input = wrapper.find("input");

      input.trigger("input");

      expect.assertions(2);
      expect(wrapper.find("li").text()).toBe(message);
      expect(input.classes()).toContain("has-error");
    });

    it("FormObserver", () => {
      const wrapper = shallow(FormInput, {
        propsData: {
          ...props,
          formObserver
        }
      });

      const input = wrapper.find("input");

      input.element.value = "test value";
      input.trigger("input");

      expect(formObserver.hasError).toBeFalsy();
    });

    it("dirty attr, 入力が一度されてからエラー表示を行う", () => {
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

      const input = wrapper.find("input");
      const messages = wrapper.find("ul");

      input.element.value = "a";
      input.trigger("input");

      expect.assertions(4);
      expect(input.classes()).not.toContain("has-error");
      expect(messages.isVisible()).toBeFalsy();

      input.element.value = "aa";
      input.trigger("input");
      expect(input.classes()).toContain("has-error");
      expect(messages.isVisible()).toBeTruthy();
    });
  });
});

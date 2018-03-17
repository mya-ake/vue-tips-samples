import { shallow } from "@vue/test-utils";

import { FormInput } from "@/components";

describe("FormInput", () => {
  describe("Initialize", () => {
    it("only requred", () => {
      const props = {
        id: "search",
        label: "Search"
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
        required: ""
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
        label: "Item1"
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
    const props = {
      id: "item1",
      label: "Item1"
    };

    it("validator", () => {
      const message = "empty";
      const wrapper = shallow(FormInput, {
        propsData: {
          ...props,
          validator(value) {
            const messages = [];
            if (value.length === 0) {
              messages.push(message);
            }
            return messages;
          }
        }
      });

      wrapper.find("input").trigger("input");
      expect(wrapper.find("li").text()).toBe(message);
    });
  });
});

import Vue from "vue";
import { shallow } from "@vue/test-utils";

import { FormSelect } from "@/components";
import { BaseSelectFormItem } from "@/models";

class SelectProcess {
  constructor(wrapper) {
    this._wrapper = wrapper;
    this._select = this._wrapper.find("select");
    this._callCount = 0;
  }

  async select(value) {
    this._select.element.value = value; // 入力
    this._select.trigger("input"); // inputイベント発火
    this._wrapper.vm.formItem.value = this._wrapper.emitted().input[
      this._callCount
    ][0]; // 親のv-modelから値が返ってくることを想定
    this._callCount++;
    await Vue.nextTick();
  }
}

class BasicSelectFormItem extends BaseSelectFormItem {
  constructor(value) {
    super(value);
    this.options = [{ text: "test value", value: "test" }];
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
  EMPTY: "選択してください",
  INVALID: "不正な操作が必要な行われました"
};

describe("FormSelect", () => {
  describe("Initialize", () => {
    it("only requred", () => {
      const props = {
        id: "select",
        label: "Select",
        formItem: new BasicSelectFormItem("")
      };
      const wrapper = shallow(FormSelect, {
        propsData: props
      });

      const label = wrapper.find("label");
      const select = wrapper.find("select");

      expect.assertions(6);
      expect(label.text()).toBe(props.label);
      expect(label.attributes().for).toBe(select.attributes().id);
      expect(select.attributes().name).toBe(props.id);
      expect(select.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll("option").wrappers).toHaveLength(2);
      expect(wrapper.findAll("li").wrappers).toHaveLength(0);
    });

    it("basic props", () => {
      const props = {
        id: "select",
        label: "Select",
        name: "select-name",
        required: "",
        formItem: new BasicSelectFormItem("")
      };
      const wrapper = shallow(FormSelect, {
        propsData: props
      });

      const label = wrapper.find("label");
      const select = wrapper.find("select");

      expect.assertions(7);
      expect(label.text()).toBe(props.label);
      expect(label.attributes().for).toBe(select.attributes().id);
      expect(select.attributes().name).toBe(props.name);
      expect(select.attributes().required).not.toBeUndefined();
      expect(select.element.value).toBe(props.formItem.value);
      expect(wrapper.findAll("option").wrappers).toHaveLength(2);
      expect(wrapper.findAll("li").wrappers).toHaveLength(0);
    });

    it("initial validate", async () => {
      const props = {
        id: "select",
        label: "Select",
        formItem: new BasicSelectFormItem("a"),
        initialValidation: ""
      };
      const wrapper = shallow(FormSelect, {
        propsData: props
      });

      const select = wrapper.find("select");

      await Vue.nextTick();
      expect.assertions(3);
      expect(wrapper.find("li").text()).toBe(
        BasicSelectFormItem.MESSAGES.INVALID
      );
      expect(select.classes()).toContain("has-error");
      expect(wrapper.emitted().notify).toHaveLength(1);
    });
  });

  describe("Events", () => {
    let wrapper;
    const props = {
      id: "item1",
      label: "Item1",
      formItem: new BasicSelectFormItem("")
    };
    beforeEach(() => {
      wrapper = shallow(FormSelect, {
        propsData: props
      });
    });

    it("input", () => {
      const inputText = "test";

      const select = wrapper.find("select");
      select.element.value = inputText;
      select.trigger("input");

      expect.assertions(2);
      expect(wrapper.emitted().input).toHaveLength(1);
      expect(wrapper.emitted().input[0][0]).toEqual(inputText);
    });

    it("notify", async () => {
      const selectProcess = new SelectProcess(wrapper);
      await selectProcess.select("test");

      expect.assertions(2);
      expect(wrapper.emitted().notify).toHaveLength(1);
      expect(wrapper.emitted().notify[0][0]).toEqual({
        name: props.id,
        result: true
      });
    });
  });

  describe("Validate", () => {
    const props = {
      id: "item1",
      label: "Item1"
    };

    it("dirty attr, 選択が一度されてからバリデーションを行う", async () => {
      const wrapper = shallow(FormSelect, {
        propsData: {
          ...props,
          formItem: new BasicSelectFormItem("a"),
          dirty: "",
          initialValidation: ""
        }
      });

      const selectProcess = new SelectProcess(wrapper);
      const select = wrapper.find("select");
      const messages = wrapper.find("ul");

      expect.assertions(4);
      expect(select.classes()).not.toContain("has-error");
      expect(messages.isVisible()).toBe(false);

      await selectProcess.select("");

      expect(select.classes()).toContain("has-error");
      expect(messages.isVisible()).toBe(true);
    });

    it("Touched attr, selectのフォーカスが離れてからバリデーションを行う", async () => {
      const wrapper = shallow(FormSelect, {
        propsData: {
          ...props,
          formItem: new BasicSelectFormItem(""),
          touched: ""
        }
      });

      const selectProcess = new SelectProcess(wrapper);
      const select = wrapper.find("select");
      const messages = wrapper.find("ul");

      await selectProcess.select("test");

      expect.assertions(6);
      expect(select.classes()).not.toContain("has-error");
      expect(messages.isVisible()).toBe(false);

      await selectProcess.select("");

      expect(select.classes()).not.toContain("has-error");
      expect(messages.isVisible()).toBe(false);

      select.trigger("blur");

      expect(select.classes()).toContain("has-error");
      expect(messages.isVisible()).toBe(true);
    });
  });
});

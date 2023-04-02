import {
  createBlock,
  createVNode,
  defineComponent,
  openBlock,
  renderSlot,
  toDisplayString
} from "./chunk-R225DL6P.js";

// node_modules/vue-writer/dist/vue-writer.esm.js
var script = defineComponent({
  name: "VueWriter",
  props: {
    array: {
      type: Array,
      required: true
    },
    eraseSpeed: {
      type: Number,
      default: 100
    },
    typeSpeed: {
      type: Number,
      default: 200
    },
    delay: {
      type: Number,
      default: 2e3
    },
    intervals: {
      type: Number,
      default: 500
    },
    start: {
      type: Number,
      default: 0
    },
    caret: {
      type: String,
      default: "cursor"
    },
    iterations: {
      type: Number,
      default: 0
    }
  },
  data: function data() {
    return {
      typeValue: "",
      count: 0,
      typeStatus: false,
      arrayIndex: 0,
      charIndex: 0
    };
  },
  methods: {
    typewriter: function typewriter() {
      var loop = 0;
      if (this.charIndex < this.array[this.arrayIndex].length) {
        if (!this.typeStatus) {
          this.typeStatus = true;
        }
        this.typeValue += this.array[this.arrayIndex].charAt(this.charIndex);
        this.charIndex += 1;
        setTimeout(this.typewriter, this.typeSpeed);
      } else {
        this.count += 1;
        if (this.count === this.array.length) {
          loop += 1;
          if (loop === this.iterations) {
            return this.typeStatus = false;
          }
        }
        this.typeStatus = false;
        setTimeout(this.eraser, this.delay);
      }
    },
    eraser: function eraser() {
      if (this.charIndex > 0) {
        if (!this.typeStatus)
          this.typeStatus = true;
        this.typeValue = this.array[this.arrayIndex].substring(0, this.charIndex - 1);
        this.charIndex -= 1;
        setTimeout(this.eraser, this.eraseSpeed);
      } else {
        this.typeStatus = false;
        this.arrayIndex += 1;
        if (this.arrayIndex >= this.array.length)
          this.arrayIndex = 0;
        setTimeout(this.typewriter, this.typeSpeed + this.intervals);
      }
    }
  },
  created: function created() {
    setTimeout(this.typewriter, this.start);
  }
});
var _hoisted_1 = {
  class: "is-typed"
};
var _hoisted_2 = {
  class: "typed"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock("div", _hoisted_1, [renderSlot(_ctx.$slots, "default"), createVNode("span", _hoisted_2, toDisplayString(_ctx.typeValue), 1), createVNode("span", {
    class: _ctx.caret + " " + {
      typing: _ctx.typeStatus
    }
  }, " ", 2)]);
}
script.render = render;
var entry_esm = function() {
  var installable = script;
  installable.install = function(app) {
    app.component("VueWriter", installable);
  };
  return installable;
}();
var vue_writer_esm_default = entry_esm;
export {
  vue_writer_esm_default as default
};
//# sourceMappingURL=vue-writer.js.map

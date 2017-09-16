"use strict";
import {
  TwBase,
  TwElem,
  TwListener,
  TwAttr,
  TwSetter,
} from "./twdom";

export default class PrettyPrinter {
  constructor() {
    this.output_ = "";
    this.indent_ = 0;
  }
  indent() {
    this.indent_++;
  }
  unindent() {
    if (this.indent_ > 0) {
      this.indent_--;
    }
  }
  indentation() {
    return " ".repeat(this.indent_ * 2);
  }
  append(s) {
    this.output_ += this.indentation() + s + "\n";
  }
  formatValue(v) {
    if (v === "") {
      return '""';
    } else if (v === null) {
      return "null";
    } else if (v === false || v === true) {
      return v.toString();
    } else if (isNaN(v)) {
      return '"' + v + '"';
    } else {
      return v.toString();
    }
  }
  visit(obj) {
    if (obj instanceof TwAttr) {
      this.append(obj.name + " = " + this.formatValue(obj.value));
    } else if (obj instanceof TwElem) {
      this.append(obj.type + " {");
      this.indent();
      for (let attr of obj.attrs) {
        attr.accept(this);
      }
      for (let elem of obj.elems) {
        elem.accept(this);
      }
      for (let handler of obj.listeners) {
        handler.accept(this);
      }
      for (let setter of obj.setters) {
        setter.accept(this);
      }
      this.unindent();
      this.append("}");
    } else if (obj instanceof TwListener) {
      this.append(obj.event + " listener");
    } else if (obj instanceof TwSetter) {
      this.append(obj.prop + " = " + this.formatValue(obj.value));
    }
    return this;
  }
  get output() {
    return this.output_;
  }
}

export function twPrettyPrint(twdom) {
  let pp = new PrettyPrinter();
  twdom.accept(pp);
  return pp.output;
}
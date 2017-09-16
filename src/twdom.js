"use strict";

function hash(e){for(var r=0,i=0;i<e.length;i++)r=((r<<5)-r+e.charCodeAt(i))&r;return r};

export class TwBase {
  constructor() {}
  accept(visitor) { return visitor.visit(this); }
}
export class TwAttr extends TwBase {
  constructor(name, value) {
    super();
    this.name_ = name;
    this.value_ = value;
  }
  get name() { return this.name_; }
  get value() { return this.value_; }
}
export class TwListener extends TwBase {
  constructor(event, handler) {
    super();
    this.event_ = event;
    this.handler_ = handler;
  }
  get event() { return this.event_; }
  get handler() { return this.handler_; }
}
export class TwSetter extends TwBase {
  constructor(prop, value) {
    super();
    this.prop_ = prop;
    this.value_ = value;
  }
  get prop() { return this.prop_; }
  get value() { return this.value_; }
  set(elem) { elem[this.prop_] = this.value_; }
}
export class TwElem extends TwBase {
  constructor() {
    super();
    this.attrs_ = [];
    this.elems_ = [];
    this.listeners_ = [];
    this.setters_ = [];
    this.type_ = arguments[0];
    let children = Array.prototype.slice.call(arguments, 1);
    this.addChildren(children);
  }
  addChildren(children) {
    for (let child of children) {
      if (child instanceof Array) {
        this.addChildren(child);
      } else if (child instanceof TwAttr) {
        this.addAttr(child);
      } else if (child instanceof TwElem) {
        this.addElem(child);
      } else if (child instanceof TwListener) {
        this.addListener(child);
      } else if (child instanceof TwSetter) {
        this.addSetter(child);
      }
    }
  }
  get type() { return this.type_; }
  get attrs() { return this.attrs_; }
  get elems() { return this.elems_; }
  get listeners() { return this.listeners_; }
  get setters() { return this.setters_; }
  addAttr(attr) { this.attrs_.push(attr); }
  addElem(elem) { this.elems_.push(elem); }
  addListener(listener) { this.listeners_.push(listener); }
  addSetter(setter) { this.setters_.push(setter); }
}

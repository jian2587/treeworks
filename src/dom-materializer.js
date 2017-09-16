"use strict";
import {
  TwBase,
  TwElem,
  TwListener,
  TwAttr,
  TwSetter,
} from "./twdom";

export class DomMaterializer {
  constructor(elem = null) {
    this.elem_ = elem;
  }
  visit(obj) {
    if (obj instanceof Array) {
      for (let item of obj) {
        if (item instanceof TwElem) {
          this.elem_.appendChild(item.accept(this));
        } else if (item instanceof TwAttr) {
          this.elem_.setAttribute(item.name, item.value);
        } else if (item instanceof TwListener) {
          this.elem_.addEventListener(item.event, item.handler);
        } else if (item instanceof TwSetter) {
          this.elem_[item.prop] = item.value;
        }
      }
    } else if (obj instanceof TwElem) {
      let parentElem = document.createElement(obj.type);
      for (let attr of obj.attrs) {
        parentElem.setAttribute(attr.name, attr.value);
      }
      for (let listener of obj.listeners) {
        parentElem.addEventListener(listener.event, listener.handler);
      }
      for (let elem of obj.elems) {
        parentElem.appendChild(elem.accept(this));
      }
      for (let setter of obj.setters) {
        parentElem[setter.prop] = setter.value;
      }
      return parentElem;
    }
  }
}

export function makeDom(twDom) {
  return new DomMaterializer().visit(twDom);
}

export function applyTwDom(elem, twDom) {
  return new DomMaterializer(elem).visit(twDom);
}

export default function installMaterializer(host) {
  host.makeDom = makeDom;
  host.applyTwDom = applyTwDom;
}

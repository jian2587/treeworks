/* treeworks.js v0.1
 * Author: TJ Chear
 */
"use strict";

import {
  TwBase,
  TwElem,
  TwListener,
  TwAttr,
  TwSetter,
} from "./twdom";

function installTwElem(host, elem) {
  host[elem] = function() {
    return new TwElem(elem.toLowerCase(), ...arguments);
  }
}

function installTwElems(host) {
  const elems = [
    "A",
    "Abbr",
    "Area",
    "Audio",
    "B",
    "Blockquote",
    "Body",
    "Br",
    "Button",
    "Canvas",
    "Code",
    "Colgroup",
    "Col",
    "Div",
    "Em",
    "Embed",
    "Fieldset",
    "Font",
    "Footer",
    "Form",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "Hr",
    "Iframe",
    "Img",
    "Input",
    "Ins",
    "Kbd",
    "Keygen",
    "Label",
    "Legend",
    "Li",
    "Link",
    "Map",
    "Menu",
    "Menuitem",
    "Meta",
    "Nav",
    "Object",
    "Ol",
    "Option",
    "Output",
    "P",
    "Picture",
    "Pre",
    "Q",
    "Section",
    "Select",
    "Small",
    "Source",
    "Span",
    "Strong",
    "Style",
    "Sub",
    "Sup",
    "Table",
    "Tbody",
    "Td",
    "Textarea",
    "Tfoot",
    "Thead",
    "Time",
    "Title",
    "Tr",
    "U",
    "Ul",
    "Video",
  ];
  for (let elem of elems) {
    installTwElem(host, elem);
  }
}

function installTwAttr(host, attr) {
  if (attr instanceof Array) {
    host[attr[0]] = function(value) {
      return new TwAttr(attr[1].toLowerCase(), value);
    }
  } else {
    host[attr] = function(value) {
      return new TwAttr(attr.toLowerCase(), value);
    }
  }
}

function installTwAttrs(host) {
  const attrs = [
    "Accept",
    ["AcceptCharset", "accept-charset"],
    "Action",
    "Autocomplete",
    "Autofocus",
    "Autoplay",
    "Challenge",
    "Checked",
    "Class",
    "Cols",
    "Colspan",
    "Content",
    "Contenteditable",
    "Contextmenu",
    "Controls",
    "Coords",
    "Data",
    "Dir",
    "Dirname",
    "Disabled",
    "Download",
    "Draggable",
    "Dropzone",
    "Enctype",
    "For",
    "form",
    "Formaction",
    "Headers",
    "Height",
    "Hidden",
    "Href",
    "Hreflang",
    "Id",
    "Ismap",
    "Keytype",
    "label",
    "Lang",
    "List",
    "Loop",
    "Max",
    "Maxlength",
    "Media",
    "Method",
    "Min",
    "Multiple",
    "Muted",
    "Name",
    "Novalidate",
    "Pattern",
    "Placeholder",
    "Poster",
    "Preload",
    "Readonly",
    "Rel",
    "Required",
    "Reversed",
    "Rows",
    "Rowspan",
    "Sandbox",
    "Scope",
    "Scoped",
    "Selected",
    "Shape",
    "Size",
    "Sizes",
    "span",
    "Spellcheck",
    "Src",
    "Srcdoc",
    "Start",
    "Step",
    "style",
    "Tabindex",
    "Target",
    "title",
    "Translate",
    "Type",
    "Usemap",
    "Value",
    "Width",
    "Wrap",
  ];
  for (let attr of attrs) {
    installTwAttr(host, attr);
  }
}

function installTwSetter(host, setter, prop) {
  host[setter] = function(value) {
    return new TwSetter(prop, value);
  }
}

function installTwSetters(host) {
  const props = [
    ["Text", "textContent"],
  ];
  for (let kv of props) {
    installTwSetter(host, kv[0], kv[1]);
  }
}

function installTwListener(host, event) {
  host["On" + event] = function(handler) {
    return new TwListener(event, handler);
  }
}

function installTwListeners(host) {
  const events = [
    "abort",
    "blur",
    "canplay",
    "canplaythrough",
    "change",
    "contextmenu",
    "copy",
    "click",
    "cuechange",
    "cut",
    "dblclick",
    "drag",
    "dragend",
    "dragenter",
    "dragleave",
    "dragover",
    "dragstart",
    "drop",
    "durationchange",
    "emptied",
    "ended",
    "error",
    "focus",
    "input",
    "invalid",
    "keydown",
    "keypress",
    "keyup",
    "loadeddata",
    "loadedmetadata",
    "loadstart",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "paste",
    "pause",
    "play",
    "playing",
    "progress",
    "ratechange",
    "reset",
    "scroll",
    "search",
    "seeked",
    "seeking",
    "select",
    "show",
    "stalled",
    "submit",
    "suspend",
    "toggle",
    "timeupdate",
    "volumechange",
    "waiting",
    "wheel",
  ];
  for (let event of events) {
    installTwListener(host, event);
  }
}

export default function installTreeWorks(host) {
    installTwAttrs(host);
    installTwElems(host);
    installTwListeners(host);
    installTwSetters(host);
}

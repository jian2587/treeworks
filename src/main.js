"use strict";

import {makeDom, applyTwDom} from "./dom-materializer";
import {PrettyPrinter, twPrettyPrint} from "./pretty-printer";
import installTreeWorks from "./twdom-sugar";

installTreeWorks(window);
window.makeDom = makeDom;
window.applyTwDom = applyTwDom;
// installMaterializer(window);
window.twPrettyPrint = twPrettyPrint;

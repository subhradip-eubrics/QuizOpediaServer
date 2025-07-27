"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
if (!crypto.randomUUID) {
    crypto.randomUUID = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (Number(c) ^
        (crypto.randomBytes(1)[0] & (15 >> (Number(c) / 4)))).toString(16));
}
//# sourceMappingURL=polyfills.js.map
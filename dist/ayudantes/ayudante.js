"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarGuid = generarGuid;
exports.isNumberString = isNumberString;
function generarGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
function isNumberString(s) {
    if (typeof s !== 'string')
        return false;
    s = s.trim();
    if (s === '')
        return false;
    const n = Number(s);
    return Number.isFinite(n);
}

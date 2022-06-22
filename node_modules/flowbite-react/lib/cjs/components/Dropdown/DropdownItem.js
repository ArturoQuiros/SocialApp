"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownItem = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const DropdownItem = ({ children, onClick }) => ((0, jsx_runtime_1.jsx)("li", { className: "block cursor-pointer py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white", onClick: onClick, children: children }));
exports.DropdownItem = DropdownItem;

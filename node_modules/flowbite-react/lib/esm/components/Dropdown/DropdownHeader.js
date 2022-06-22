import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { excludeClassName } from '../../helpers/exclude';
import { DropdownDivider } from './DropdownDivider';
export const DropdownHeader = ({ children, ...props }) => {
    const theirProps = excludeClassName(props);
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "block py-2 px-4 text-sm text-gray-700 dark:text-gray-200", ...theirProps, children: children }), _jsx(DropdownDivider, {})] }));
};

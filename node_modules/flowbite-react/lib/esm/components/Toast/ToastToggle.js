import { jsx as _jsx } from "react/jsx-runtime";
import { HiX } from 'react-icons/hi';
import { useTheme } from '../Flowbite/ThemeContext';
import { useToastContext } from './ToastContext';
export const ToastToggle = ({ xIcon: XIcon = HiX }) => {
    const { duration, isClosed, isRemoved, setIsClosed, setIsRemoved } = useToastContext();
    const theme = useTheme().theme.toast.toggle;
    const handleClick = () => {
        setIsClosed(!isClosed);
        setTimeout(() => setIsRemoved(!isRemoved), duration);
    };
    return (_jsx("button", { "data-testid": "toast-toggle-element", type: "button", className: theme.base, onClick: handleClick, "aria-label": "close", children: _jsx(XIcon, { className: theme.icon }) }));
};

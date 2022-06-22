import type { ComponentProps, FC, PropsWithChildren } from 'react';
export interface BreadcrumbItemProps extends PropsWithChildren<ComponentProps<'li'>> {
    href?: string;
    icon?: FC<ComponentProps<'svg'>>;
}
declare const BreadcrumbItem: FC<BreadcrumbItemProps>;
export default BreadcrumbItem;

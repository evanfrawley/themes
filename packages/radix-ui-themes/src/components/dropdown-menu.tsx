'use client';

import * as React from 'react';
import classNames from 'classnames';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronRightIcon, DotFilledIcon } from '@radix-ui/react-icons';
import {
  dropdownMenuContentModeDefault,
  dropdownMenuContentSizeDefault,
  dropdownMenuContentVariantDefault,
  dropdownMenuContentColorDefault,
  dropdownMenuContentHighContrastDefault,
  dropdownMenuItemColorDefault,
} from './dropdown-menu.props';
import { withBreakpoints } from '../helpers';
import { ThemeConfig, useThemeConfigContext } from '../theme-config';

import type { DropdownMenuContentSize, DropdownMenuContentVariant } from './dropdown-menu.props';
import type { Responsive, PropsWithoutRefOrColor } from '../helpers';
import type { ThemeMode, ThemeAccentScale } from '../theme';

interface DropdownMenuRootProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Root> {}
const DropdownMenuRoot: React.FC<DropdownMenuRootProps> = (props) => (
  <DropdownMenuPrimitive.Root {...props} />
);
DropdownMenuRoot.displayName = 'DropdownMenuRoot';

type DropdownMenuTriggerElement = React.ElementRef<typeof DropdownMenuPrimitive.Trigger>;
interface DropdownMenuTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>, 'asChild'> {}
const DropdownMenuTrigger = React.forwardRef<DropdownMenuTriggerElement, DropdownMenuTriggerProps>(
  (props, forwardedRef) => <DropdownMenuPrimitive.Trigger {...props} ref={forwardedRef} asChild />
);
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

type DropdownMenuContentContextValue = {
  size?: Responsive<DropdownMenuContentSize>;
  variant?: DropdownMenuContentVariant;
  color?: ThemeAccentScale;
  highContrast?: boolean;
};
const DropdownMenuContentContext = React.createContext<DropdownMenuContentContextValue>({});
type DropdownMenuContentElement = React.ElementRef<typeof DropdownMenuPrimitive.Content>;
interface DropdownMenuContentProps
  extends PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.Content>,
    DropdownMenuContentContextValue {
  mode?: ThemeMode;
  container?: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>['container'];
}
const DropdownMenuContent = React.forwardRef<DropdownMenuContentElement, DropdownMenuContentProps>(
  (props, forwardedRef) => {
    const themeConfigContext = useThemeConfigContext();
    const {
      className,
      children,
      mode = dropdownMenuContentModeDefault,
      size = dropdownMenuContentSizeDefault,
      variant = dropdownMenuContentVariantDefault,
      highContrast = dropdownMenuContentHighContrastDefault,
      color = dropdownMenuContentColorDefault,
      container,
      forceMount,
      ...contentProps
    } = props;
    const resolvedColor = color ?? themeConfigContext.accentScale;
    return (
      <DropdownMenuPrimitive.Portal container={container} forceMount={forceMount}>
        <ThemeConfig asChild mode={mode}>
          <DropdownMenuPrimitive.Content
            data-accent-scale={resolvedColor}
            align="start"
            sideOffset={4}
            {...contentProps}
            ref={forwardedRef}
            className={classNames(
              'rui-PopperContent',
              'rui-BaseMenuContent',
              'rui-DropdownMenuContent',
              withBreakpoints(size, 'size'),
              `variant-${variant}`,
              { 'high-contrast': highContrast },
              className
            )}
          >
            <DropdownMenuContentContext.Provider
              value={React.useMemo(
                () => ({ size, variant, color: resolvedColor, highContrast }),
                [size, variant, resolvedColor, highContrast]
              )}
            >
              {children}
            </DropdownMenuContentContext.Provider>
          </DropdownMenuPrimitive.Content>
        </ThemeConfig>
      </DropdownMenuPrimitive.Portal>
    );
  }
);
DropdownMenuContent.displayName = 'DropdownMenuContent';

type DropdownMenuLabelElement = React.ElementRef<typeof DropdownMenuPrimitive.Label>;
interface DropdownMenuLabelProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> {}
const DropdownMenuLabel = React.forwardRef<DropdownMenuLabelElement, DropdownMenuLabelProps>(
  (props, forwardedRef) => (
    <DropdownMenuPrimitive.Label
      {...props}
      ref={forwardedRef}
      className={classNames('rui-BaseMenuLabel', 'rui-DropdownMenuLabel', props.className)}
    />
  )
);
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

type DropdownMenuItemElement = React.ElementRef<typeof DropdownMenuPrimitive.Item>;
interface DropdownMenuItemProps extends PropsWithoutRefOrColor<typeof DropdownMenuPrimitive.Item> {
  color?: ThemeAccentScale;
  shortcut?: string;
}
const DropdownMenuItem = React.forwardRef<DropdownMenuItemElement, DropdownMenuItemProps>(
  (props, forwardedRef) => {
    const {
      className,
      children,
      color = dropdownMenuItemColorDefault,
      shortcut,
      ...itemProps
    } = props;
    return (
      <DropdownMenuPrimitive.Item
        data-accent-scale={color}
        {...itemProps}
        ref={forwardedRef}
        className={classNames('rui-BaseMenuItem', 'rui-DropdownMenuItem', className)}
      >
        {children}
        {shortcut && (
          <div className="rui-BaseMenuShortcut rui-DropdownMenuShortcut">{shortcut}</div>
        )}
      </DropdownMenuPrimitive.Item>
    );
  }
);
DropdownMenuItem.displayName = 'DropdownMenuItem';

type DropdownMenuGroupElement = React.ElementRef<typeof DropdownMenuPrimitive.Group>;
interface DropdownMenuGroupProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group> {}
const DropdownMenuGroup = React.forwardRef<DropdownMenuGroupElement, DropdownMenuGroupProps>(
  (props, forwardedRef) => (
    <DropdownMenuPrimitive.Group
      {...props}
      ref={forwardedRef}
      className={classNames('rui-BaseMenuGroup', 'rui-DropdownMenuGroup', props.className)}
    />
  )
);
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

type DropdownMenuRadioGroupElement = React.ElementRef<typeof DropdownMenuPrimitive.RadioGroup>;
interface DropdownMenuRadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioGroup> {}
const DropdownMenuRadioGroup = React.forwardRef<
  DropdownMenuRadioGroupElement,
  DropdownMenuRadioGroupProps
>((props, forwardedRef) => (
  <DropdownMenuPrimitive.RadioGroup
    {...props}
    ref={forwardedRef}
    className={classNames('rui-BaseMenuRadioGroup', 'rui-DropdownMenuRadioGroup', props.className)}
  />
));
DropdownMenuRadioGroup.displayName = 'DropdownMenuRadioGroup';

type DropdownMenuRadioItemElement = React.ElementRef<typeof DropdownMenuPrimitive.RadioItem>;
interface DropdownMenuRadioItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> {}
const DropdownMenuRadioItem = React.forwardRef<
  DropdownMenuRadioItemElement,
  DropdownMenuRadioItemProps
>((props, forwardedRef) => {
  const { children, className, ...itemProps } = props;
  return (
    <DropdownMenuPrimitive.RadioItem
      {...itemProps}
      ref={forwardedRef}
      className={classNames(
        'rui-BaseMenuItem',
        'rui-BaseMenuRadioItem',
        'rui-DropdownMenuItem',
        'rui-DropdownMenuRadioItem',
        className
      )}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator className="rui-BaseMenuItemIndicator rui-DropdownMenuItemIndicator">
        <DotFilledIcon />
      </DropdownMenuPrimitive.ItemIndicator>
    </DropdownMenuPrimitive.RadioItem>
  );
});
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

type DropdownMenuCheckboxItemElement = React.ElementRef<typeof DropdownMenuPrimitive.CheckboxItem>;
interface DropdownMenuCheckboxItemProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> {
  shortcut?: string;
}
const DropdownMenuCheckboxItem = React.forwardRef<
  DropdownMenuCheckboxItemElement,
  DropdownMenuCheckboxItemProps
>((props, forwardedRef) => {
  const { children, className, shortcut, ...itemProps } = props;
  return (
    <DropdownMenuPrimitive.CheckboxItem
      {...itemProps}
      ref={forwardedRef}
      className={classNames(
        'rui-BaseMenuItem',
        'rui-BaseMenuCheckboxItem',
        'rui-DropdownMenuItem',
        'rui-DropdownMenuCheckboxItem',
        className
      )}
    >
      {children}
      <DropdownMenuPrimitive.ItemIndicator className="rui-BaseMenuItemIndicator rui-DropdownMenuItemIndicator">
        <CheckIcon />
      </DropdownMenuPrimitive.ItemIndicator>
      {shortcut && <div className="rui-BaseMenuShortcut rui-DropdownMenuShortcut">{shortcut}</div>}
    </DropdownMenuPrimitive.CheckboxItem>
  );
});
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

interface DropdownMenuSubProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Sub> {}
const DropdownMenuSub = (props: DropdownMenuSubProps) => <DropdownMenuPrimitive.Sub {...props} />;
DropdownMenuSub.displayName = 'DropdownMenuSub';

type DropdownMenuSubTriggerElement = React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>;
interface DropdownMenuSubTriggerProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> {}
const DropdownMenuSubTrigger = React.forwardRef<
  DropdownMenuSubTriggerElement,
  DropdownMenuSubTriggerProps
>((props, forwardedRef) => {
  const { className, children, ...subTriggerProps } = props;
  return (
    <DropdownMenuPrimitive.SubTrigger
      {...subTriggerProps}
      ref={forwardedRef}
      className={classNames(
        'rui-BaseMenuItem',
        'rui-BaseMenuSubTrigger',
        'rui-DropdownMenuItem',
        'rui-DropdownMenuSubTrigger',
        className
      )}
    >
      {children}
      <div className="rui-BaseMenuShortcut rui-DropdownMenuShortcut">
        <ChevronRightIcon />
      </div>
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownMenuSubTrigger.displayName = 'DropdownMenuSubTrigger';

type DropdownMenuSubContentElement = React.ElementRef<typeof DropdownMenuPrimitive.SubContent>;
interface DropdownMenuSubContentProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> {
  container?: React.ComponentProps<typeof DropdownMenuPrimitive.Portal>['container'];
}
const DropdownMenuSubContent = React.forwardRef<
  DropdownMenuSubContentElement,
  DropdownMenuSubContentProps
>((props, forwardedRef) => {
  const { className, container, forceMount, ...subContentProps } = props;
  const { size, variant, color, highContrast } = React.useContext(DropdownMenuContentContext);
  return (
    <DropdownMenuPrimitive.Portal container={container} forceMount={forceMount}>
      <ThemeConfig asChild>
        <DropdownMenuPrimitive.SubContent
          data-accent-scale={color}
          alignOffset={-Number(size) * 4}
          {...subContentProps}
          ref={forwardedRef}
          className={classNames(
            'rui-PopperContent',
            'rui-BaseMenuContent',
            'rui-BaseMenuSubContent',
            'rui-DropdownMenuContent',
            'rui-DropdownMenuSubContent',
            withBreakpoints(size, 'size'),
            `variant-${variant}`,
            { 'high-contrast': highContrast },
            className
          )}
        />
      </ThemeConfig>
    </DropdownMenuPrimitive.Portal>
  );
});
DropdownMenuSubContent.displayName = 'DropdownMenuSubContent';

type DropdownMenuSeparatorElement = React.ElementRef<typeof DropdownMenuPrimitive.Separator>;
interface DropdownMenuSeparatorProps
  extends React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> {}
const DropdownMenuSeparator = React.forwardRef<
  DropdownMenuSeparatorElement,
  DropdownMenuSeparatorProps
>((props, forwardedRef) => (
  <DropdownMenuPrimitive.Separator
    {...props}
    ref={forwardedRef}
    className={classNames('rui-BaseMenuSeparator', 'rui-DropdownMenuSeparator', props.className)}
  />
));
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenu = Object.assign(DropdownMenuRoot, {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Label: DropdownMenuLabel,
  Item: DropdownMenuItem,
  Group: DropdownMenuGroup,
  RadioGroup: DropdownMenuRadioGroup,
  RadioItem: DropdownMenuRadioItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  Sub: DropdownMenuSub,
  SubTrigger: DropdownMenuSubTrigger,
  SubContent: DropdownMenuSubContent,
  Separator: DropdownMenuSeparator,
});

export {
  DropdownMenu,
  DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
};

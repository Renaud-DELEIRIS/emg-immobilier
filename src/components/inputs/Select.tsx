import * as SelectPrimitive from "@radix-ui/react-select";
import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import * as React from "react";

import { twMerge } from "tailwind-merge";
import { cn } from "~/lib/utils";

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-[46px] w-full items-center justify-between rounded-lg border border-[#E6E8EC] bg-white px-4 py-[18px] text-base font-medium ring-offset-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-grey [&>span]:truncate",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <IconChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <IconChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <IconChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-slate-200 bg-white text-slate-950 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-base outline-none focus:bg-slate-100 focus:text-slate-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-slate-800 dark:focus:text-slate-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <IconCheck className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-slate-100 dark:bg-slate-800", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

interface SelectInputProps<T>
  extends Omit<React.ComponentPropsWithoutRef<typeof Select>, "value"> {
  value: T;
  onChange: (value: T) => void;
  options: {
    label: string;
    value: T;
    group?: string;
    detail?: string;
  }[];
  label?: string;
  error?: string;
  placeholder?: string;
  wrapperClassName?: string;
  className?: string;
}

const SelectInputComp = <T extends string | undefined>(
  {
    label,
    error,
    value,
    wrapperClassName,
    className,
    onValueChange,
    onChange,
    placeholder,
    ...props
  }: SelectInputProps<T>,
  ref: React.Ref<typeof Select>
) => {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open) {
      document.body.style.setProperty("overflow-y", "auto", "important");
      document.body.style.setProperty("margin-right", "0px", "important");
    } else {
      document.body.style.removeProperty("margin-right");
      document.body.style.removeProperty("overflow-y");
    }
  }, [open]);

  // Sorted options by group
  const sortedOptions = props.options.reduce<{
    [key: string]: { label: string; value: T; detail?: string }[];
  }>((acc, option) => {
    if (option.group) {
      acc[option.group] = acc[option.group] || [];
      acc[option.group]!.push(option);
    } else {
      acc[""] = acc[""] || [];
      acc[""]!.push(option);
    }
    return acc;
  }, {});

  return (
    <div className={twMerge("w-full", wrapperClassName)}>
      {label && (
        <label
          className="mb-[6px] block text-sm font-medium opacity-80"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <Select
        value={value}
        onValueChange={(e) => {
          onValueChange && onValueChange(e);
          onChange && onChange(e as T);
        }}
        open={open}
        onOpenChange={setOpen}
        {...props}
      >
        <SelectTrigger
          ref={ref as React.ElementRef<typeof Select>}
          onClick={() => setOpen(!open)}
          className={className}
        >
          <SelectValue className="text-left" placeholder={placeholder}>
            {value ? props.options.find((o) => o.value === value)?.label : null}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(sortedOptions).map(([group, options]) => (
            <React.Fragment key={group}>
              {group && (
                <SelectGroup>
                  <SelectLabel>{group}</SelectLabel>
                </SelectGroup>
              )}
              {options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value!}
                  textValue={option.label}
                >
                  <div className="flex flex-col items-start text-left">
                    <span className="w-full truncate">{option.label}</span>
                    {option.detail && (
                      <span className="w-full truncate text-xs text-slate-500">
                        {option.detail}
                      </span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </React.Fragment>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <span className="mt-1 block text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

const SelectInput = React.forwardRef(SelectInputComp) as <
  T extends string | undefined
>(
  p: SelectInputProps<T> & {
    ref?: React.RefObject<React.ElementRef<typeof Select>>;
  }
) => React.ReactElement;

export { SelectInput };

import * as React from 'react'
import { IconButton, Dialog as SheetPrimitive } from '@radix-ui/themes'
import { Cross2Icon } from '@radix-ui/react-icons'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const SheetRoot = SheetPrimitive.Root
const SheetTrigger = SheetPrimitive.Trigger
const SheetClose = SheetPrimitive.Close
const SheetTitle = SheetPrimitive.Title
const SheetDescription = SheetPrimitive.Description

const sheetVariants = cva(
  'fixed z-50 rounded-none transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom:
          'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        right:
          'inset-y-0 right-0 h-full border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
      },
    },
    defaultVariants: {
      side: 'right',
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps
>(({ side = 'right', className, children, ...props }, ref) => (
  <SheetPrimitive.Content ref={ref} className={cn(sheetVariants({ side }), className)} {...props}>
    {children}
    <SheetPrimitive.Close className="absolute right-4 top-4">
      <IconButton size="1" variant="soft" color="gray">
        <Cross2Icon className="size-4" />
        <span className="sr-only">Close</span>
      </IconButton>
    </SheetPrimitive.Close>
  </SheetPrimitive.Content>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

export const Sheet = {
  Root: SheetRoot,
  Trigger: SheetTrigger,
  Close: SheetClose,
  Content: SheetContent,
  Title: SheetTitle,
  Description: SheetDescription,
}

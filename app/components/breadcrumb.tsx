/* eslint-disable react/prop-types */
import { ChevronRightIcon, DotsHorizontalIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Link } from '@radix-ui/themes'
import * as React from 'react'

import { cn } from '@/lib/utils'
import { Link as RouterLink } from '@remix-run/react'

const BreadcrumbRoot = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<'nav'> & {
    separator?: React.ReactNode
  }
>(({ ...props }, ref) => <nav ref={ref} aria-label="breadcrumb" {...props} />)
BreadcrumbRoot.displayName = 'Breadcrumb'

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <Flex
      asChild
      align="center"
      wrap="wrap"
      gap={{
        initial: '1',
        sm: '2',
      }}
    >
      <ol ref={ref} {...props} className={cn('break-words', className)} />
    </Flex>
  )
)
BreadcrumbList.displayName = 'BreadcrumbList'

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <Flex asChild align="center" gap="2">
      <li ref={ref} className={cn('inline-flex', className)} {...props} />
    </Flex>
  )
)
BreadcrumbItem.displayName = 'BreadcrumbItem'

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, ...props }, ref) => {
  return (
    <Link
      ref={ref}
      color="gray"
      size="2"
      className={cn('transition-colors hover:text-foreground', className)}
      {...props}
    />
  )
})
BreadcrumbLink.displayName = 'BreadcrumbLink'

const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  React.ComponentPropsWithoutRef<'span'> & { isActive?: boolean }
>(({ isActive = true, ...props }, ref) => (
  <Heading
    role="link"
    aria-disabled="true"
    aria-current="page"
    color="gray"
    highContrast={isActive}
    size="2"
    weight="regular"
    asChild
  >
    <span ref={ref} {...props} />
  </Heading>
))
BreadcrumbPage.displayName = 'BreadcrumbPage'

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => (
  <li
    role="presentation"
    aria-hidden="true"
    className={cn('[&>svg]:size-3.5 text-[--gray-a11]', className)}
    {...props}
  >
    {children ?? <ChevronRightIcon />}
  </li>
)
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator'

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    role="presentation"
    aria-hidden="true"
    className={cn('flex h-9 w-9 items-center justify-center', className)}
    {...props}
  >
    <DotsHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More</span>
  </span>
)
BreadcrumbEllipsis.displayName = 'BreadcrumbElipssis'

export const BreadcrumbPrimitive = {
  Root: BreadcrumbRoot,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  List: BreadcrumbList,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
}

type Breadcrumb = {
  links: Array<{ label: string; to?: string; RenderLink?: () => React.ReactNode }>
}

export const Breadcrumb = ({ links }: Breadcrumb) => {
  return (
    <BreadcrumbPrimitive.Root>
      <BreadcrumbPrimitive.List>
        {links.map((link, index) => {
          return (
            <React.Fragment key={link.label}>
              <BreadcrumbPrimitive.Item>
                {index === links.length - 1 ? (
                  <BreadcrumbPrimitive.Page>{link.label}</BreadcrumbPrimitive.Page>
                ) : link.to ? (
                  <BreadcrumbPrimitive.Link asChild>
                    {link.RenderLink ? (
                      link.RenderLink()
                    ) : (
                      <RouterLink to={link.to}>Home</RouterLink>
                    )}
                  </BreadcrumbPrimitive.Link>
                ) : (
                  <BreadcrumbPrimitive.Page isActive={false}>{link.label}</BreadcrumbPrimitive.Page>
                )}
              </BreadcrumbPrimitive.Item>

              {index !== links.length - 1 ? <BreadcrumbPrimitive.Separator /> : null}
            </React.Fragment>
          )
        })}
      </BreadcrumbPrimitive.List>
    </BreadcrumbPrimitive.Root>
  )
}

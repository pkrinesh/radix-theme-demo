import './index.css'
import { Box, Flex, Text, Theme, ThemePanel } from '@radix-ui/themes'
import { Links, Meta, NavLink, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'
import clsx from 'clsx'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return (
    <Theme accentColor="indigo" grayColor="gray">
      <Flex direction="column" minHeight="100vh" className="bg-[--gray-1]">
        <Box
          asChild
          position="fixed"
          top="0"
          className="w-full bg-[--gray-surface] backdrop-blur-sm z-10 border-b border-[--gray-5]"
        >
          <header>
            <Flex gap="4" className="px-8 max-w-screen-2xl items-center h-14">
              <Text weight="bold" size="4">
                Radix Themes
              </Text>
              <nav>
                <ul className="flex gap-4">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        clsx(
                          'text-sm hover:text-[--gray-11]',
                          isActive ? 'text-[--gray-12]' : 'text-[--gray-10]'
                        )
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/meters"
                      className={({ isActive }) =>
                        clsx(
                          'text-sm hover:text-[--gray-11]',
                          isActive ? 'text-[--gray-12]' : 'text-[--gray-10]'
                        )
                      }
                    >
                      Meters
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </Flex>
          </header>
        </Box>
        <Box className="mt-14">
          <Outlet />
        </Box>
      </Flex>
      <ThemePanel />
    </Theme>
  )
}

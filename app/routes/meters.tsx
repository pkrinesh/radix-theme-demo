import { Link, Outlet } from '@remix-run/react'
import clsx from 'clsx'

const METERS = {
  gt: {
    GT1: [
      {
        id: 1,
        name: 'GT1',
        type: 'main',
        is_exists: true,
      },
      {
        id: 2,
        name: 'GT1',
        type: 'check',
        is_exists: false,
      },
    ],
    GT2: [
      {
        id: 3,
        name: 'GT2',
        type: 'main',
        is_exists: false,
      },
      {
        id: 4,
        name: 'GT2',
        type: 'check',
        is_exists: true,
      },
    ],
    GT3: [
      {
        id: 5,
        name: 'GT3',
        type: 'main',
        is_exists: true,
      },
      {
        id: 6,
        name: 'GT3',
        type: 'check',
        is_exists: true,
      },
    ],
    GT4: [
      {
        id: 7,
        name: 'GT4',
        type: 'main',
        is_exists: false,
      },
      {
        id: 8,
        name: 'GT4',
        type: 'check',
        is_exists: false,
      },
    ],
  },
  st: {
    ST1: [
      {
        id: 9,
        name: 'ST1',
        type: 'main',
        is_exists: false,
      },
      {
        id: 10,
        name: 'ST1',
        type: 'check',
        is_exists: false,
      },
    ],
    ST2: [
      {
        id: 11,
        name: 'ST2',
        type: 'main',
        is_exists: true,
      },
      {
        id: 12,
        name: 'ST2',
        type: 'check',
        is_exists: false,
      },
    ],
  },
  line: {
    LINE1: [
      {
        id: 13,
        name: 'LINE1',
        type: 'main',
        is_exists: true,
      },
      {
        id: 14,
        name: 'LINE1',
        type: 'check',
        is_exists: false,
      },
    ],
    LINE2: [
      {
        id: 15,
        name: 'LINE2',
        type: 'main',
        is_exists: true,
      },
      {
        id: 16,
        name: 'LINE2',
        type: 'check',
        is_exists: false,
      },
    ],
    LINE3: [
      {
        id: 17,
        name: 'LINE3',
        type: 'main',
        is_exists: true,
      },
      {
        id: 18,
        name: 'LINE3',
        type: 'check',
        is_exists: false,
      },
    ],
    LINE4: [
      {
        id: 19,
        name: 'LINE4',
        type: 'main',
        is_exists: true,
      },
      {
        id: 20,
        name: 'LINE4',
        type: 'check',
        is_exists: false,
      },
    ],
    LINE5: [
      {
        id: 21,
        name: 'LINE5',
        type: 'main',
        is_exists: true,
      },
      {
        id: 22,
        name: 'LINE5',
        type: 'check',
        is_exists: false,
      },
    ],
    LINE6: [
      {
        id: 23,
        name: 'LINE6',
        type: 'main',
        is_exists: true,
      },
      {
        id: 24,
        name: 'LINE6',
        type: 'check',
        is_exists: false,
      },
    ],
  },
}

export default function Dashboard() {
  return (
    <div className="p-4 min-h-screen space-y-4 w-full bg-stone-100">
      <ul className="flex flex-nowrap">
        {Object.entries(METERS).map(([meter_type, meters]) => {
          return (
            <div key={meter_type} className="flex">
              {Object.entries(meters).map(([meter_type, meters]) => {
                return (
                  <div
                    key={meter_type}
                    className="inline-block p-2 bg-background space-y-2 first:rounded-l-lg last:rounded-r-lg border"
                  >
                    <h6 className="ml-1 font-bold tracking-widest">{meter_type}</h6>
                    <div className="flex p-1 items-center rounded-md text-sm font-semibold bg-muted shadow border border-borderss">
                      {meters.map((meter) => {
                        return (
                          <li
                            key={meter.id}
                            className={clsx(
                              ' px-2 py-1 size-full flex items-center',
                              meter.is_exists ? 'text-shadow-green' : 'text-shadow-red',
                              meter.id === 2 && 'bg-stone-300',
                              meter.type === 'check'
                                ? 'rounded-r-sm border-l-2 border-l-stone-300'
                                : 'rounded-l-sm'
                            )}
                          >
                            <Link to="#">{meter.type}</Link>
                          </li>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </ul>

      <ul className="flex justify-center">
        {Object.entries(METERS).map(([meter_type, meters]) => {
          return (
            <div
              key={meter_type}
              className="border flex gap-2 border-stone-300 p-3 first:rounded-l-xl last:rounded-r-xl"
            >
              {Object.entries(meters).map(([meter_type, meters]) => {
                return (
                  <div
                    key={meter_type}
                    className="inline-block py-2 px-4 bg-background space-y-2 rounded-lg border border-border"
                  >
                    <h6 className="ml-1 font-bold tracking-widest">{meter_type}</h6>

                    {meters.map((meter) => {
                      return (
                        <li
                          key={meter.id}
                          className={clsx(
                            'flex px-3 py-1.5 items-center rounded-md text-sm font-semibold bg-muted shadow border border-border',
                            meter.id === 2 && 'bg-stone-300'
                          )}
                        >
                          <Link
                            to="#"
                            className={clsx(
                              'rounded-sm size-full flex items-center',
                              meter.is_exists ? 'text-shadow-green' : 'text-shadow-red'
                            )}
                          >
                            {meter.type}
                          </Link>
                        </li>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )
        })}
      </ul>
      <Outlet />
    </div>
  )
}

import { Link, Outlet } from '@remix-run/react'
import clsx from 'clsx'

import { AgGridReact } from 'ag-grid-react'
import { useCallback, useMemo, useState } from 'react'

import { CellValueChangedEvent, ColDef } from 'ag-grid-community'
import { Box, Flex, Heading, Text } from '@radix-ui/themes'

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
    <Box p="6" width="100%" className="space-y-4">
      <ul className="flex justify-between flex-nowrap">
        {Object.entries(METERS).map(([meter_type, meters]) => {
          return (
            <Flex key={meter_type}>
              {Object.entries(meters).map(([meter_type, meters]) => {
                return (
                  <Box
                    p="2"
                    key={meter_type}
                    className="bg-[--gray-2] space-y-2 first:rounded-l-lg last:rounded-r-lg border border-[--gray-6]"
                  >
                    <Heading as="h6" size="2">
                      {meter_type}
                    </Heading>
                    <Flex align="center" className="rounded bg-[--gray-4]">
                      {meters.map((meter) => {
                        return (
                          <li key={meter.id}>
                            <Link
                              to="#"
                              className={clsx(
                                'flex px-2 py-1 hover:bg-[--gray-6] transition-all',
                                meter.is_exists ? 'text-[--jade-9]' : 'text-[--ruby-9]',
                                meter.id === 2 && 'bg-[--gray-6]',
                                meter.type === 'check'
                                  ? 'rounded-r border-l border-[--gray-6]'
                                  : 'rounded-l border-r border-[--gray-6]'
                              )}
                            >
                              <Text weight="medium" size="2">
                                {meter.type}
                              </Text>
                            </Link>
                          </li>
                        )
                      })}
                    </Flex>
                  </Box>
                )
              })}
            </Flex>
          )
        })}
      </ul>

      <EditableGridExample />
      <Outlet />
    </Box>
  )
}

export interface IOlympicData {
  id: number
  athlete: string
  age: number
  country: string
  year: number
  date: string
  sport: string
  gold: number
  silver: number
  bronze: number
  total: number
}

const EditableGridExample = () => {
  const containerStyle = useMemo(() => ({ width: '100%', height: '400px' }), [])
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), [])
  const [rowData, setRowData] = useState<IOlympicData[]>()
  const [columnDefs] = useState<ColDef[]>([
    { field: 'athlete', minWidth: 160 },
    { field: 'age' },
    { field: 'country', minWidth: 140 },
    { field: 'year' },
    { field: 'date', minWidth: 140 },
    { field: 'sport', minWidth: 160 },
    { field: 'gold' },
    { field: 'silver' },
    { field: 'bronze' },
    { field: 'total' },
  ])
  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      editable: true,
    }
  }, [])

  const onGridReady = useCallback(() => {
    fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
      .then((resp) => resp.json())
      .then((data: IOlympicData[]) => {
        data.forEach((item, index) => (item.id = index))
        setRowData(data)
      })
  }, [])

  const cellValueChanged = useCallback(
    (event: CellValueChangedEvent<IOlympicData, string | number>) => {
      console.log(event)
      const data = event.data // get the new data of the row
      const field = event.colDef.field // get the key of the object
      const newValue = event.newValue // get the new value of the cell
      const oldItem = rowData?.find((row) => row.id === data.id)
      if (!oldItem || !field) {
        return
      }
      console.log('onCellEditRequest, updating ' + field + ' to ' + newValue)
      const newData = rowData?.map((oldItem) => (oldItem.id == data.id ? data : oldItem))
      setRowData(newData)
    },
    [rowData]
  )

  console.log(rowData && { newData: rowData[0] })

  return (
    <Box style={containerStyle}>
      <Box style={gridStyle} className={'ag-theme-quartz'}>
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onCellValueChanged={cellValueChanged}
        />
      </Box>
    </Box>
  )
}

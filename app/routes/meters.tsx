import { AgGridReact } from 'ag-grid-react'
import { useCallback, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'
import { Box, Button, DropdownMenu, Flex, Heading, Tabs, Text } from '@radix-ui/themes'
import { CellValueChangedEvent, ColDef } from 'ag-grid-community'
import { BookmarkIcon, TableIcon, UploadIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'
import { METERS_LIST } from '@/lib/meters-list'

export default function Dashboard() {
  return (
    <Box px="6" py="3" width="100%" className="space-y-2">
      <Heading>Meters</Heading>
      <ul className="flex justify-between flex-nowrap">
        {Object.entries(METERS_LIST).map(([meter_type, meters]) => {
          return (
            <Flex direction="column" key={meter_type}>
              <Flex
                justify="center"
                align="center"
                className="bg-[--gray-3] border border-[--gray-6] rounded-t-md"
              >
                <Text size="2">{meter_type}</Text>
              </Flex>
              <Flex>
                {Object.entries(meters).map(([meter_type, meters]) => {
                  return (
                    <Box
                      p="2"
                      minWidth="80px"
                      key={meter_type}
                      className="bg-[--gray-2] space-y-2 first:rounded-bl-md last:rounded-br-md border border-[--gray-6]"
                    >
                      <Flex justify="between" align="center" gap="4">
                        <Heading as="h6" size="2">
                          {meter_type}
                        </Heading>
                      </Flex>
                      <Flex direction="column" align="stretch" gap="1">
                        {meters.map((meter) => {
                          return (
                            <li key={meter.id}>
                              <DropdownMenu.Root>
                                <DropdownMenu.Trigger>
                                  <Button
                                    size="1"
                                    color={meter.is_exist ? 'jade' : 'ruby'}
                                    variant="soft"
                                    className={cn(
                                      'w-full',
                                      meter.is_primary && meter.is_exist && 'bg-[--jade-7]'
                                    )}
                                  >
                                    {meter.type}
                                  </Button>
                                </DropdownMenu.Trigger>
                                <DropdownMenu.Content>
                                  <DropdownMenu.Item asChild>
                                    <Link to="/">
                                      {meter.is_exist ? (
                                        <>
                                          <TableIcon />
                                          View meter data
                                        </>
                                      ) : (
                                        <>
                                          <UploadIcon />
                                          Upload meter data
                                        </>
                                      )}
                                    </Link>
                                  </DropdownMenu.Item>
                                  <DropdownMenu.Item
                                    onClick={() => console.log('Bookmarked')}
                                    disabled={!meter.is_exist || meter.is_primary}
                                  >
                                    <BookmarkIcon />
                                    Set as a Primary{' '}
                                  </DropdownMenu.Item>
                                </DropdownMenu.Content>
                              </DropdownMenu.Root>
                            </li>
                          )
                        })}
                      </Flex>
                    </Box>
                  )
                })}
              </Flex>
            </Flex>
          )
        })}
      </ul>

      <Tabs.Root defaultValue="deviation">
        <Tabs.List>
          <Tabs.Trigger value="deviation">Deviation</Tabs.Trigger>
          <Tabs.Trigger value="meters">Meters</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="deviation">
            <EditableGridExample />
          </Tabs.Content>

          <Tabs.Content value="meters">
            <EditableGridExample />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
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

  return (
    <Box style={containerStyle}>
      <Box style={gridStyle} className={'ag-theme-quartz'}>
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
          onCellValueChanged={cellValueChanged}
          noRowsOverlayComponent={() => <Text>No Data found</Text>}
        />
      </Box>
    </Box>
  )
}

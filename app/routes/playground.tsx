import { Breadcrumb } from '@/components/breadcrumb'
import { Box, Button, Flex } from '@radix-ui/themes'
import { Controller, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'

// https://www.freecodecamp.org/news/how-to-format-number-as-currency-in-javascript-one-line-of-code/

const options = [
  {
    id: 'krinesh',
    name: 'Krinesh',
  },
  {
    id: 'krupa',
    name: 'Krupa',
  },
]

export default function Playground() {
  const { handleSubmit, control } = useForm()

  const submitHandler = (data) => {
    console.log(data.users)
  }

  return (
    <Box>
      <Flex px="4" align="center" className="h-12 border-b border-b-[--gray-a6]">
        <Breadcrumb
          links={[
            {
              label: 'Home',
              to: '/',
            },
            {
              label: 'Playground',
            },
          ]}
        />
      </Flex>

      <Box p="4">
        <Box maxWidth="420px">
          <Box p="4" className="border border-[--gray-a6] rounded-md">
            <form onSubmit={handleSubmit(submitHandler)}>
              <Controller
                control={control}
                name="users"
                render={({ field: { onChange, onBlur, value, name, ref } }) => (
                  <ReactSelect
                    options={options}
                    getOptionLabel={(option) => option.name}
                    getOptionValue={(option) => option.id}
                    onChange={onChange}
                    isMulti={true}
                    onBlur={onBlur}
                    value={value}
                    name={name}
                    ref={ref}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: '#8da4ef',
                      },
                    })}
                    styles={{
                      control: (baseStyles) => ({
                        ...baseStyles,
                        minHeight: '32px',
                        height: '32px',
                        fontSize: '14px',
                      }),
                      input: (provided) => ({
                        ...provided,
                        margin: '0px',
                      }),
                      valueContainer: (provided) => ({
                        ...provided,
                        height: '30px',
                        padding: '0px 2px',
                      }),
                      indicatorsContainer: (provided) => ({
                        ...provided,
                        height: '30px',
                      }),
                      menu: (base) => ({
                        ...base,
                        fontSize: '14px',
                        padding: '0px 4px',
                        zIndex: 100,
                      }),
                      menuPortal: (base) => ({
                        ...base,
                        zIndex: 50,
                      }),
                    }}
                  />
                )}
              />
              <Button mt="2">Submit</Button>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

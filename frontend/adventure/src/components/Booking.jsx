import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers-pro/LocalizationProvider';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

export const Booking = () => {
  return (
    <div><LocalizationProvider dateAdapter={AdapterDayjs}>
    <DemoContainer components={['DateRangePicker']}>
      <DateRangePicker localeText={{ start: 'Check-in', end: 'Check-out' }} />
    </DemoContainer>
  </LocalizationProvider></div>
  )
}
export default Booking 

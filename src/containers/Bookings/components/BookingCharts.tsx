// deps
import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
// local
// components
// helpers
import { IBooking } from '_/model/booking'
import { handleBookingGroups } from '_/containers/Bookings/helpers'

const BOOKING_BUCKETS = {
  Cheap: 100,
  Normal: 200,
  Expensive: 300,
}

interface IProps {
  bookings: IBooking[]
}

const BookingCharts: React.FC<IProps> = ({ bookings }) => {
  // todo to helper
  // todo add calculation

  const bookingGroups = handleBookingGroups(bookings, BOOKING_BUCKETS)

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'My chart',
    },
    xAxis: {
      type: 'category',
      labels: {
        style: {
          fontSize: '13px',
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Quantity (units)',
      },
    },
    series: [
      {
        name: 'Bookings',
        data: bookingGroups,
      },
    ],
  }

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </>
  )
}

export default BookingCharts

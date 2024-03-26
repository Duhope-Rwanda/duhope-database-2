import React, { FC } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { useAppSelector } from '../../redux/hooks';

function format_date({
  date,
  format = 'short'
}: {
  date: string | Date;
  format: 'long' | 'short';
}): string {
  const converted_date = date
    ? new Date(date)
    : new Date();

  /*
       const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric'
        };
    */
  const options: Intl.DateTimeFormatOptions = {
    month: format === 'short' ? 'short' : 'long',
    day: 'numeric',
    year:
      format === 'long' ? 'numeric' : undefined
  };

  return converted_date.toLocaleDateString(
    'default',
    options
  );
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: string | number;
    payload: {
      createdAt: string;
      quantity: number;
      amount: number;
      total: number;
      name: string[];
    };
  }>;
  label?: string;
}
const CustomTooltip: FC<CustomTooltipProps> = ({
  active,
  payload,
  label
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: '#ddd',
          paddingTop: '0.5rem',
          paddingBottom: '0.5rem',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          borderRadius: '8px',
          color: '#000'
        }}
      >
        <p>
          Name(s):{' '}
          {payload[0].payload.name.join(', ')}
        </p>
        <p>
          Quantity: {payload[0].payload.quantity}
        </p>
        <p>Total: {payload[0].payload.total}</p>
      </div>
    );
  }

  return null;
};

const LineChartComponent = () => {
  const { loading, orders } = useAppSelector(
    (state) => state.orders
  );

  const processed_data = orders.map(
    (order: any) => ({
      createdAt: format_date({
        date: order.createdAt,
        format: 'short',
      }),
      quantity: order.quantity,
      amount: order.amount,
      total: order.total,
      name: order.products.map(
        (product: any) => product.name
      ),
    })
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {loading ? (
        <div>...</div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={processed_data}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <Line
              name="Amount"
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              strokeWidth={2}
            />
            <XAxis />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default LineChartComponent;
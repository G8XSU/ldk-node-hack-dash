import { Revenue } from '@/app/lib/definitions';
import { lusitana } from '@/app/ui/fonts';

// This component is representational only.
// For data visualization UI, check out:
// https://www.tremor.so/
// https://www.chartjs.org/
// https://airbnb.io/visx/

import React from 'react';

interface Props {
  revenue: Revenue[];
}

export default async function Chart({ revenue }: Props) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {revenue.map((revenue, index) => (
            <tr key={index}>
              <td>{revenue.month}</td>
              <td>{revenue.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
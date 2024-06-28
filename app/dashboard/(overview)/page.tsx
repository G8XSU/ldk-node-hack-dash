import CardWrapper, { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchCardData, fetchLatestInvoices, fetchRevenue, getNodeBalances, listChannels, listPaymentHistory } from '@/app/lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '@/app/ui/skeletons';
import ListChannels from '@/app/ui/list-channels';
import ListPayments from '@/app/ui/list-payments';

export default async function Page() {
  const channelsP = listChannels();
  const balancesP = getNodeBalances();
  const paymentsP = listPaymentHistory();
  const data = await Promise.all([channelsP, balancesP, paymentsP]);

  const channels = data[0];
  const balances = data[1];
  const payments = data[2];
  //const { numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices } = data[1];

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* <CardWrapper props:{numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices} />*/}
        {<Card title="TotalOnchain" value={balances.totalOnchainBalanceSats} type="collected" />}
        {<Card title="SpendableOnchain" value={balances.spendableOnchainBalanceSats} type="pending" />}
        {<Card title="Total Lightning" value={balances.totalLightningBalanceSats} type="invoices" />}
        {/*<Card
          title="Total Customers"
          value={numberOfCustomers}
          type="customers"
        />*/}
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">

        {/* <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense> */}

        <ListChannels channels={channels.channels} />
        <ListPayments payments={payments.payments} />
      </div>
    </main>
  );
}

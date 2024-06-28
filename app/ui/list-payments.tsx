import { ArrowPathIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { lusitana } from '@/app/ui/fonts';
import { Channel, PaymentDetails, PaymentStatus } from '@/generated/proto/ldk_server_hack';
export default async function ListPayments({
  payments,
}: {
  payments: PaymentDetails[];
}) {
  return (
    <div className="flex w-full flex-col md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Payment List
      </h2>
      <div className="flex grow flex-col justify-between rounded-xl bg-gray-50 p-4">
        {/* NOTE: comment in this code when you get to this point in the course */}

        <div className="bg-white px-6">
          {payments.map((payment, i) => {
            return (
              <div
                key={payment.id}
                className={clsx(
                  'flex flex-row items-center justify-between py-4',
                  {
                    'border-t': i !== 0,
                  },
                )}
              >
                <div className="flex items-center">
                  {/* <Image
                    src={invoice.image_url}
                    alt={`${invoice.name}'s profile picture`}
                    className="mr-4 rounded-full"
                    width={32}
                    height={32}
                  /> */}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold md:text-base">
                      {payment.direction==0?'Inbound':'Outbound'}
                    </p>
                            <p className="hidden text-sm text-gray-500 sm:block">
                                {payment.status === PaymentStatus.PENDING ? 'Pending' : payment.status === PaymentStatus.SUCCEEDED ? 'Succeeded' : 'Failed'}
                            </p>
                        </div>
                </div>
                <p
                  className={`${lusitana.className} truncate text-sm font-medium md:text-base`}
                >
                  {payment.amountMsat}
                </p>
              </div>
            );
          })}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <ArrowPathIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Updated just now</h3>
        </div>
      </div>
    </div>
  );
}

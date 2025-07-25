
import { getClients } from '@/lib/data';
import InvoiceForm from './invoice-form';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function InvoiceFormSkeleton() {
    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="space-y-2">
                         <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="space-y-2">
                         <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </div>
                 <div className="space-y-4">
                    <Skeleton className="h-6 w-24" />
                    <div className="flex items-end gap-4">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-10" />
                    </div>
                 </div>
            </div>
        </div>
    )
}


export default async function NewInvoicePage() {
  const clients = await getClients();

  return (
    <Suspense fallback={<InvoiceFormSkeleton />}>
        <InvoiceForm clients={clients} />
    </Suspense>
  );
}

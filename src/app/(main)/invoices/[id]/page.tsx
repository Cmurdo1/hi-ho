import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { Download, Send } from 'lucide-react';

import { getInvoiceById } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function InvoiceDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const invoice = getInvoiceById(params.id);

  if (!invoice) {
    notFound();
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };
  
  const statusVariant = (status: 'Paid' | 'Due' | 'Overdue' | 'Draft') => {
    switch (status) {
      case 'Paid':
        return 'default';
      case 'Overdue':
        return 'destructive';
      case 'Due':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-headline font-bold">
            Invoice #{invoice.invoiceNumber}
          </h1>
          <Badge variant={statusVariant(invoice.status)} className="mt-1">{invoice.status}</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          <Button variant="outline">
            <Send className="mr-2 h-4 w-4" />
            Send Email
          </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-lg">Billed to</h3>
              <p className="font-bold text-primary">{invoice.client.name}</p>
              <p className="text-muted-foreground">{invoice.client.email}</p>
              <p className="text-muted-foreground">{invoice.client.address}</p>
            </div>
            <div className="md:text-right">
              <h3 className="font-semibold text-lg">Invoice Details</h3>
              <p>
                <span className="text-muted-foreground">Issue Date: </span>
                {format(parseISO(invoice.issueDate), 'LLL dd, yyyy')}
              </p>
              <p>
                <span className="text-muted-foreground">Due Date: </span>
                {format(parseISO(invoice.dueDate), 'LLL dd, yyyy')}
              </p>
               {invoice.paidDate && (
                <p>
                    <span className="text-muted-foreground">Paid Date: </span>
                    {format(parseISO(invoice.paidDate), 'LLL dd, yyyy')}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">
                    {item.description}
                  </TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(item.price * item.quantity)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3} className="text-right font-bold text-lg">Total</TableCell>
                    <TableCell className="text-right font-bold text-lg">{formatCurrency(invoice.total)}</TableCell>
                </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

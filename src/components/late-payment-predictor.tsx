'use client';

import { useState } from 'react';
import { BrainCircuit } from 'lucide-react';

import { predictLatePayment } from '@/ai/flows/late-payment-prediction';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { getInvoicesByClientId } from '@/lib/data';

interface LatePaymentPredictorProps {
  clientId: string;
}

export function LatePaymentPredictor({ clientId }: LatePaymentPredictorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<{ isLikelyLate: boolean; reason: string } | null>(null);
  const { toast } = useToast();

  const handlePredict = async () => {
    setIsLoading(true);
    setIsOpen(true);

    try {
      const invoiceHistory = getInvoicesByClientId(clientId);
      const simplifiedHistory = invoiceHistory.map(inv => ({
          invoiceId: inv.id,
          issueDate: inv.issueDate,
          dueDate: inv.dueDate,
          paymentDate: inv.paidDate,
          amount: inv.total
      }));
      
      const result = await predictLatePayment({
        clientId,
        invoiceHistory: JSON.stringify(simplifiedHistory),
      });

      setPrediction(result);
    } catch (error) {
      console.error('Prediction failed:', error);
      toast({
        variant: 'destructive',
        title: 'Prediction Error',
        description: 'Could not generate a payment prediction at this time.',
      });
      setIsOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handlePredict} disabled={isLoading}>
        <BrainCircuit className="mr-2 h-4 w-4" />
        {isLoading ? 'Analyzing...' : 'Predict Late Payment'}
      </Button>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {isLoading ? 'Analyzing Payment History...' : 'Payment Prediction'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {isLoading
                ? 'Our AI is analyzing the client\'s past payment behavior to predict future trends.'
                : prediction?.reason}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {!isLoading && prediction && (
            <div className={`p-4 rounded-md ${prediction.isLikelyLate ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                <p className="font-bold text-lg">
                    {prediction.isLikelyLate ? 'Late Payment Likely' : 'On-Time Payment Likely'}
                </p>
            </div>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setPrediction(null)}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

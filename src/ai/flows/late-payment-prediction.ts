'use server';
/**
 * @fileOverview An AI agent that predicts late payments based on client history.
 *
 * - predictLatePayment - A function that predicts if a client will pay late.
 * - PredictLatePaymentInput - The input type for the predictLatePayment function.
 * - PredictLatePaymentOutput - The return type for the predictLatePayment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictLatePaymentInputSchema = z.object({
  clientId: z.string().describe('The ID of the client to predict payment behavior for.'),
  invoiceHistory: z
    .string()
    .describe(
      'A JSON string containing an array of objects, where each object represents an invoice with fields like invoiceId, issueDate, dueDate, paymentDate (or null if not paid), and amount. All dates should be in ISO 8601 format.'
    ),
});
export type PredictLatePaymentInput = z.infer<typeof PredictLatePaymentInputSchema>;

const PredictLatePaymentOutputSchema = z.object({
  isLikelyLate:
    z
      .boolean()
      .describe(
        'Whether the client is likely to pay late based on their payment history. True if late payment is likely, false otherwise.'
      ),
  reason:
    z
      .string()
      .describe(
        'A brief explanation of why the client is predicted to pay late, based on their invoice history.'
      ),
});
export type PredictLatePaymentOutput = z.infer<typeof PredictLatePaymentOutputSchema>;

export async function predictLatePayment(input: PredictLatePaymentInput): Promise<PredictLatePaymentOutput> {
  return predictLatePaymentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'predictLatePaymentPrompt',
  input: {schema: PredictLatePaymentInputSchema},
  output: {schema: PredictLatePaymentOutputSchema},
  prompt: `You are an AI assistant specializing in predicting late payments. Analyze the client\'s invoice history to determine if they are likely to pay late.

  Consider factors such as:
    - Average payment time (how many days past the due date do they typically pay?)
    - Consistency (do they always pay around the same time, or is it erratic?)
    - Trends (are they getting slower or faster at paying?)
    - Any completely unpaid invoices

  Based on your analysis, determine if the client is likely to pay late. Provide a boolean value for isLikelyLate (true if late payment is likely, false otherwise) and a brief explanation in the reason field.

  Here is the client\'s invoice history:
  {{invoiceHistory}}
`,
});

const predictLatePaymentFlow = ai.defineFlow(
  {
    name: 'predictLatePaymentFlow',
    inputSchema: PredictLatePaymentInputSchema,
    outputSchema: PredictLatePaymentOutputSchema,
  },
  async input => {
    try {
      // Attempt to parse the invoice history.  If it fails, that\'s a problem with the data, so reject it.
      JSON.parse(input.invoiceHistory);
    } catch (e) {
      throw new Error('Invalid JSON format for invoice history: ' + e);
    }
    const {output} = await prompt(input);
    return output!;
  }
);

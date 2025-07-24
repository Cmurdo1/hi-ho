
import { createClient } from '@/lib/supabase/server';
import type { Invoice, Client, Item } from './types';

// Helper functions to get data
export async function getInvoices() {
  const supabase = createClient();
  const { data, error } = await supabase.from('invoices').select(`
      id,
      invoice_number,
      issue_date,
      due_date,
      status,
      total,
      paid_date,
      clients (
        id,
        name,
        email,
        address
      )
    `);

  if (error) {
    console.error('Error fetching invoices:', error);
    return [];
  }

  return data.map((invoice: any) => ({
    id: invoice.id,
    invoiceNumber: invoice.invoice_number,
    issueDate: invoice.issue_date,
    dueDate: invoice.due_date,
    status: invoice.status,
    total: invoice.total,
    paidDate: invoice.paid_date,
    client: {
        id: invoice.clients.id,
        name: invoice.clients.name,
        email: invoice.clients.email,
        address: invoice.clients.address,
    },
    items: [],
    clientId: invoice.clients.id,
  }));
}

export async function getInvoiceById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('invoices')
      .select(
        `
        id,
        invoice_number,
        issue_date,
        due_date,
        status,
        total,
        paid_date,
        clients (
            id,
            name,
            email,
            address
        ),
        invoice_line_items (
            id,
            description,
            quantity,
            price
        )
      `
      )
      .eq('id', id)
      .single();
  
    if (error) {
      console.error('Error fetching invoice:', error);
      return null;
    }
  
    return {
      id: data.id,
      invoiceNumber: data.invoice_number,
      issueDate: data.issue_date,
      dueDate: data.due_date,
      status: data.status,
      total: data.total,
      paidDate: data.paid_date,
      client: data.clients,
      items: data.invoice_line_items,
      clientId: data.clients.id,
    };
  }

export async function getClients(): Promise<Client[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from('clients').select('*');

    if (error) {
        console.error('Error fetching clients:', error);
        return [];
    }
    return data;
}

export async function getClientById(id: string) {
    const supabase = createClient();
    const { data, error } = await supabase.from('clients').select('*').eq('id', id).single();
    
    if (error) {
        console.error('Error fetching client:', error);
        return null;
    }
    return data;
}

export async function getItems(): Promise<Item[]> {
    const supabase = createClient();
    const { data, error } = await supabase.from('items').select('*');

    if (error) {
        console.error('Error fetching items:', error);
        return [];
    }
    return data;
}

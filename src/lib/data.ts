import type { Client, Item, Invoice } from './types';

// In a real application, this data would be fetched from a database.
// For this example, we're using in-memory arrays.
export let clients: Client[] = [];
export let items: Item[] = [];
export let invoices: Invoice[] = [];

// Helper functions to get data
export const getInvoices = () => invoices;
export const getInvoiceById = (id: string) => invoices.find(inv => inv.id === id);
export const getClients = () => clients;
export const getClientById = (id: string) => clients.find(c => c.id === id);
export const getItems = () => items;
export const getInvoicesByClientId = (clientId: string) => invoices.filter(inv => inv.clientId === clientId);

// Helper functions to add data (for demonstration purposes)
export const addClient = (client: Omit<Client, 'id'>) => {
    const newClient = { ...client, id: `${Date.now()}` };
    clients.push(newClient);
    return newClient;
}

export const addItem = (item: Omit<Item, 'id'>) => {
    const newItem = { ...item, id: `item-${Date.now()}` };
    items.push(newItem);
    return newItem;
}

export const addInvoice = (invoice: Omit<Invoice, 'id' | 'invoiceNumber' | 'total' | 'status'> & {items: Omit<Invoice['items'][0], 'id'>[]}) => {
    const client = getClientById(invoice.clientId);
    if (!client) throw new Error('Client not found');

    const total = invoice.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newInvoice: Invoice = {
        ...invoice,
        id: `inv-${Date.now()}`,
        invoiceNumber: `2024-${(invoices.length + 1).toString().padStart(3, '0')}`,
        status: 'Due',
        total,
        client,
        items: invoice.items.map(item => ({ ...item, id: `item-${Date.now()}-${Math.random()}` })),
        paidDate: null,
    };
    invoices.push(newInvoice);
    return newInvoice;
}
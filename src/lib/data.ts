
import type { Client, Item, Invoice } from './types';

// In a real application, this data would be fetched from a database.
let clients: Client[] = [
    { id: '1', name: 'Innovate LLC', email: 'contact@innovatellc.com', address: '123 Innovation Drive, Tech City' },
    { id: '2', name: 'Quantum Creations', email: 'hello@quantum.art', address: '456 Quantum Way, Creative Town' },
    { id: '3', name: 'Artisan Bakes', email: 'orders@artisanbakes.com', address: '789 Pastry Lane, Foodie Village' },
    { id: '4', name: 'Eco Solutions', email: 'info@ecosolutions.com', address: '101 Green Path, Eco-Town' },
    { id: '5', name: 'Peak Performance', email: 'support@peak.fit', address: '212 Fitness Ave, Healthburg' },
];

let items: Item[] = [
    { id: 'item-1', name: 'Web Design Consultation', description: '1-hour consultation on web design strategies.', price: 150 },
    { id: 'item-2', name: 'Logo Design Package', description: 'Includes 3 logo concepts and revisions.', price: 500 },
    { id: 'item-3', name: 'Monthly SEO Service', description: 'Ongoing search engine optimization.', price: 750 },
    { id: 'item-4', name: 'Custom Website Development', description: 'Full website build from scratch.', price: 3000 },
];

let invoices: Invoice[] = [
    {
        id: 'inv-001',
        clientId: '1',
        invoiceNumber: '2024-001',
        issueDate: '2025-07-25T00:00:00.000Z',
        dueDate: '2025-08-08T00:00:00.000Z',
        status: 'Paid',
        total: 5750,
        paidDate: '2025-08-01T00:00:00.000Z',
        client: clients[0],
        items: [
            { id: '1', description: 'Full-stack development for e-commerce platform', quantity: 1, price: 5000 },
            { id: '2', description: 'Domain name registration', quantity: 1, price: 50 },
            { id: '3', description: 'SSL Certificate', quantity: 1, price: 700 }
        ]
    },
    {
        id: 'inv-002',
        clientId: '2',
        invoiceNumber: '2024-002',
        issueDate: '2025-06-30T00:00:00.000Z',
        dueDate: '2025-07-14T00:00:00.000Z',
        status: 'Overdue',
        total: 2500,
        paidDate: null,
        client: clients[1],
        items: [
            { id: '1', description: '3D modeling for a new product', quantity: 1, price: 2000 },
            { id: '2', description: 'Animation services', quantity: 1, price: 500 }
        ]
    },
    {
        id: 'inv-003',
        clientId: '3',
        invoiceNumber: '2024-003',
        issueDate: '2025-08-04T00:00:00.000Z',
        dueDate: '2025-08-18T00:00:00.000Z',
        status: 'Due',
        total: 750,
        paidDate: null,
        client: clients[2],
        items: [
            { id: '1', description: 'Wedding cake order', quantity: 1, price: 600 },
            { id: '2', description: 'Delivery fee', quantity: 1, price: 150 }
        ]
    },
    {
        id: 'inv-004',
        clientId: '4',
        invoiceNumber: '2024-004',
        issueDate: '2025-06-10T00:00:00.000Z',
        dueDate: '2025-06-24T00:00:00.000Z',
        status: 'Paid',
        total: 5000,
        paidDate: '2025-06-20T00:00:00.000Z',
        client: clients[3],
        items: [
            { id: '1', description: 'Environmental impact report', quantity: 1, price: 5000 }
        ]
    },
    {
        id: 'inv-005',
        clientId: '2',
        invoiceNumber: '2024-005',
        issueDate: '2025-05-11T00:00:00.000Z',
        dueDate: '2025-05-25T00:00:00.000Z',
        status: 'Paid',
        total: 1200,
        paidDate: '2025-05-22T00:00:00.000Z',
        client: clients[1],
        items: [
            { id: '1', description: 'UX/UI design for mobile app', quantity: 1, price: 1200 }
        ]
    },
     {
        id: 'inv-006',
        clientId: '5',
        invoiceNumber: '2024-006',
        issueDate: '2025-08-15T00:00:00.000Z',
        dueDate: '2025-08-29T00:00:00.000Z',
        status: 'Due',
        total: 1000,
        paidDate: null,
        client: clients[4],
        items: [
            { id: '1', description: 'Personal training sessions (x10)', quantity: 1, price: 1000 }
        ]
    }
];

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

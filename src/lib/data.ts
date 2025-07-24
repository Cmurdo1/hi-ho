import type { Client, Item, Invoice } from './types';

export const clients: Client[] = [
  { id: '1', name: 'Innovate LLC', email: 'contact@innovatellc.com', address: '123 Tech Park, Silicon Valley, CA' },
  { id: '2', name: 'Quantum Creations', email: 'hello@quantumcreations.io', address: '456 Future Ave, Neo-Tokyo' },
  { id: '3', name: 'Artisan Bakes', email: 'orders@artisanbakes.com', address: '789 Flour St, Paris, France' },
  { id: '4', name: 'Eco Solutions', email: 'info@ecosolutions.com', address: '101 Green Way, Oslo, Norway' },
  { id: '5', name: 'Evergreen Consulting', email: 'admin@evergreen.co', address: '212 Maple Dr, Vancouver, BC' },
];

export const items: Item[] = [
  { id: 'item-1', name: 'Web Design Package', description: 'Full website design and development', price: 5000 },
  { id: 'item-2', name: 'Brand Identity Kit', description: 'Logo, color palette, and typography', price: 2500 },
  { id: 'item-3', name: 'Hourly Consulting', description: 'Strategic business consulting', price: 150 },
  { id: 'item-4', name: 'SEO Optimization', description: 'Monthly SEO and content marketing', price: 750 },
  { id: 'item-5', name: 'Social Media Management', description: 'Full-service social media handling', price: 1200 },
];

export const invoices: Invoice[] = [
  {
    id: 'inv-001',
    invoiceNumber: '2024-001',
    client: clients[0],
    clientId: clients[0].id,
    issueDate: '2024-07-01',
    dueDate: '2024-07-31',
    items: [
      { id: '1', description: 'Web Design Package', quantity: 1, price: 5000 },
      { id: '2', description: 'Hourly Consulting', quantity: 5, price: 150 },
    ],
    status: 'Paid',
    paidDate: '2024-07-15',
    total: 5750,
  },
  {
    id: 'inv-002',
    invoiceNumber: '2024-002',
    client: clients[1],
    clientId: clients[1].id,
    issueDate: '2024-06-01',
    dueDate: '2024-07-01',
    items: [
      { id: '1', description: 'Brand Identity Kit', quantity: 1, price: 2500 },
    ],
    status: 'Overdue',
    paidDate: null,
    total: 2500,
  },
  {
    id: 'inv-003',
    invoiceNumber: '2024-003',
    client: clients[2],
    clientId: clients[2].id,
    issueDate: '2024-07-10',
    dueDate: '2024-08-09',
    items: [
      { id: '1', description: 'SEO Optimization', quantity: 1, price: 750 },
    ],
    status: 'Due',
    paidDate: null,
    total: 750,
  },
  {
    id: 'inv-004',
    invoiceNumber: '2024-004',
    client: clients[3],
    clientId: clients[3].id,
    issueDate: '2024-05-15',
    dueDate: '2024-06-14',
    items: [
      { id: '1', description: 'Web Design Package', quantity: 1, price: 5000 },
    ],
    status: 'Paid',
    paidDate: '2024-06-16',
    total: 5000,
  },
    {
    id: 'inv-005',
    invoiceNumber: '2024-005',
    client: clients[1],
    clientId: clients[1].id,
    issueDate: '2024-04-20',
    dueDate: '2024-05-20',
    items: [
      { id: '1', description: 'Social Media Management', quantity: 1, price: 1200 },
    ],
    status: 'Paid',
    paidDate: '2024-05-25',
    total: 1200,
  },
    {
    id: 'inv-006',
    invoiceNumber: '2024-006',
    client: clients[1],
    clientId: clients[1].id,
    issueDate: '2024-03-22',
    dueDate: '2024-04-21',
    items: [
      { id: '1', description: 'Hourly Consulting', quantity: 10, price: 150 },
    ],
    status: 'Paid',
    paidDate: '2024-05-01',
    total: 1500,
  },
];

// Helper functions to get data
export const getInvoices = () => invoices;
export const getInvoiceById = (id: string) => invoices.find(inv => inv.id === id);
export const getClients = () => clients;
export const getClientById = (id: string) => clients.find(c => c.id === id);
export const getItems = () => items;
export const getInvoicesByClientId = (clientId: string) => invoices.filter(inv => inv.clientId === clientId);
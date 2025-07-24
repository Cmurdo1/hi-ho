export type Client = {
  id: string;
  name: string;
  email: string;
  address: string;
};

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type InvoiceItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
};

export type Invoice = {
  id: string;
  client: Client;
  clientId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  status: 'Paid' | 'Due' | 'Overdue' | 'Draft';
  paidDate?: string | null;
  total: number;
};

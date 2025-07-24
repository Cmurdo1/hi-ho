
-- Enable the uuid-ossp extension to generate UUIDs
create extension if not exists "uuid-ossp" with schema extensions;

--
-- Clients Table
--
create table public.clients (
    id uuid default extensions.uuid_generate_v4() not null primary key,
    user_id uuid default auth.uid() not null references auth.users (id) on delete cascade,
    name text not null,
    email text,
    address text,
    created_at timestamp with time zone default now() not null
);
alter table public.clients enable row level security;
create policy "Users can view their own clients" on public.clients for select using (auth.uid() = user_id);
create policy "Users can insert their own clients" on public.clients for insert with check (auth.uid() = user_id);
create policy "Users can update their own clients" on public.clients for update using (auth.uid() = user_id);
create policy "Users can delete their own clients" on public.clients for delete using (auth.uid() = user_id);

--
-- Items Table
--
create table public.items (
    id uuid default extensions.uuid_generate_v4() not null primary key,
    user_id uuid default auth.uid() not null references auth.users (id) on delete cascade,
    name text not null,
    description text,
    price numeric(10, 2) not null,
    created_at timestamp with time zone default now() not null
);
alter table public.items enable row level security;
create policy "Users can view their own items" on public.items for select using (auth.uid() = user_id);
create policy "Users can insert their own items" on public.items for insert with check (auth.uid() = user_id);
create policy "Users can update their own items" on public.items for update using (auth.uid() = user_id);
create policy "Users can delete their own items" on public.items for delete using (auth.uid() = user_id);

--
-- Invoices Table
--
create type public.invoice_status as enum ('Paid', 'Due', 'Overdue', 'Draft');

create table public.invoices (
    id uuid default extensions.uuid_generate_v4() not null primary key,
    user_id uuid default auth.uid() not null references auth.users (id) on delete cascade,
    client_id uuid not null references public.clients (id) on delete cascade,
    invoice_number text not null,
    issue_date date not null,
    due_date date not null,
    paid_date date,
    status public.invoice_status not null,
    total numeric(10, 2) not null,
    created_at timestamp with time zone default now() not null
);
alter table public.invoices enable row level security;
create policy "Users can view their own invoices" on public.invoices for select using (auth.uid() = user_id);
create policy "Users can insert their own invoices" on public.invoices for insert with check (auth.uid() = user_id);
create policy "Users can update their own invoices" on public.invoices for update using (auth.uid() = user_id);
create policy "Users can delete their own invoices" on public.invoices for delete using (auth.uid() = user_id);

--
-- Invoice Items Table
--
create table public.invoice_items (
    id uuid default extensions.uuid_generate_v4() not null primary key,
    user_id uuid default auth.uid() not null references auth.users (id) on delete cascade,
    invoice_id uuid not null references public.invoices (id) on delete cascade,
    description text not null,
    quantity integer not null,
    price numeric(10, 2) not null,
    created_at timestamp with time zone default now() not null
);
alter table public.invoice_items enable row level security;
create policy "Users can view their own invoice items" on public.invoice_items for select using (auth.uid() = user_id);
create policy "Users can insert their own invoice items" on public.invoice_items for insert with check (auth.uid() = user_id);
create policy "Users can update their own invoice items" on public.invoice_items for update using (auth.uid() = user_id);
create policy "Users can delete their own invoice items" on public.invoice_items for delete using (auth.uid() = user_id);


--
-- Function to get the next invoice number
--
create or replace function get_next_invoice_number(user_uuid uuid)
returns text as $$
declare
    last_invoice_number_part integer;
    new_invoice_number_part integer;
    current_year text;
begin
    current_year := to_char(now(), 'YYYY');

    select max(
        case 
            when split_part(invoice_number, '-', 2) ~ '^[0-9]+$' 
            then split_part(invoice_number, '-', 2)::integer
            else 0 
        end
    )
    into last_invoice_number_part
    from public.invoices
    where user_id = user_uuid and split_part(invoice_number, '-', 1) = current_year;

    if last_invoice_number_part is null then
        new_invoice_number_part := 1;
    else
        new_invoice_number_part := last_invoice_number_part + 1;
    end if;

    return current_year || '-' || lpad(new_invoice_number_part::text, 3, '0');
end;
$$ language plpgsql security definer;

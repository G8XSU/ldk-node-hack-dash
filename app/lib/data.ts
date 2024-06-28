import { Pool } from 'pg';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  User,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { unstable_noStore as noStore } from 'next/cache';
import * as ldk_server from '@/generated/proto/ldk_server_hack';
import axios from 'axios';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

const baseUrl: string = process.env.LDK_SERVER_API; // 'http://ldk-node-hack-server:3000';

export async function fetchRevenue() {
  try {
    // noStore();
    // const client = await pool.connect();
    // const data = await client.query<Revenue>('SELECT * FROM revenue');
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // client.release();
    // return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  } finally {
    return [];
  }
}
// i have multiple endpoints such as this, create exactly same function Bolt11ReceiveRequest, Bolt11ReceiveResponse, in addition to this 
export async function getNodeStatus() : Promise<ldk_server.GetNodeStatusResponse>{
  try {
    // noStore();
    const request = ldk_server.GetNodeStatusRequest.create();
    const byteBuffer = ldk_server.GetNodeStatusRequest.encode(request).finish();
    const endpoint = '/getNodeStatus';
    const response = await axios.post(`${baseUrl}${endpoint}`, byteBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      responseType: 'arraybuffer'
    });

    let deserResponse = ldk_server.GetNodeStatusResponse.decode(response.data);
    console.log(`${endpoint} Response: ` + JSON.stringify(deserResponse, undefined, 2));

    return deserResponse;

  } catch (error) {
    console.error('Request Error:', error);
    throw new Error('Failed to fetch node status.');
  }
}

export async function getBolt11ReceiveInvoice(): Promise<ldk_server.Bolt11ReceiveResponse> {
  try {
    // noStore();
    const request = ldk_server.Bolt11ReceiveRequest.create({ description:'DemoInvoice', amountMsat:50000, expirySecs:100000 });
    const byteBuffer = ldk_server.Bolt11ReceiveRequest.encode(request).finish();
    const endpoint = '/bolt11/receive';
    const response = await axios.post(`${baseUrl}${endpoint}`, byteBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      responseType: 'arraybuffer'
    });

    let deserResponse = ldk_server.Bolt11ReceiveResponse.decode(response.data);
    console.log(`${endpoint} Response: ` + JSON.stringify(deserResponse, undefined, 2));

    return deserResponse;

  } catch (error) {
    console.error('Request Error:', error);
    throw new Error('Failed to fetch Bolt11ReceiveRequest.');
  }
}

export async function listPaymentHistory(): Promise<ldk_server.PaymentsHistoryResponse> {
  try {
    const request = ldk_server.PaymentsHistoryRequest.create({});
    const byteBuffer = ldk_server.PaymentsHistoryRequest.encode(request).finish();
    const endpoint = '/listPaymentsHistory';
    const response = await axios.post(`${baseUrl}${endpoint}`, byteBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      responseType: 'arraybuffer'
    });

    let deserResponse = ldk_server.PaymentsHistoryResponse.decode(response.data);
    console.log(`${endpoint} Response: ` + JSON.stringify(deserResponse));

    return deserResponse;

  } catch (error) {
    console.error('Request Error:', error);
    throw new Error('Failed to fetch PaymentsHistoryRequest.');
  }
}

export async function getNodeFundingAddress(): Promise<ldk_server.OnchainReceiveResponse> {
  try {
    const request = ldk_server.OnchainReceiveRequest.create({});
    const byteBuffer = ldk_server.OnchainReceiveRequest.encode(request).finish();
    const endpoint = '/onchain/receive';
    const response = await axios.post(`${baseUrl}${endpoint}`, byteBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      responseType: 'arraybuffer'
    });

    let deserResponse = ldk_server.OnchainReceiveResponse.decode(response.data);
    console.log(`${endpoint} Response: ` + JSON.stringify(deserResponse));

    return deserResponse;

  } catch (error) {
    console.error('Request Error:', error);
    throw new Error('Failed to fetch OnchainReceiveRequest.');
  }
}

export async function getBoltInvoice(): Promise<ldk_server.Bolt11ReceiveResponse> {
  try {
    const request = ldk_server.Bolt11ReceiveRequest.create({description:"DemoInvoice", amountMsat:50000, expirySecs:100000});
    const byteBuffer = ldk_server.Bolt11ReceiveRequest.encode(request).finish();
    const endpoint = '/bolt11/receive';
    const response = await axios.post(`${baseUrl}${endpoint}`, byteBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      responseType: 'arraybuffer'
    });

    let deserResponse = ldk_server.Bolt11ReceiveResponse.decode(response.data);
    console.log(`${endpoint} Response: ` + JSON.stringify(deserResponse));

    return deserResponse;

  } catch (error) {
    console.error('Request Error:', error);
    throw new Error('Failed to fetch OnchainReceiveRequest.');
  }
}

export async function listChannels():Promise<ldk_server.ListChannelsResponse> {
  try {
    const request = ldk_server.ListChannelsRequest.create({});
    const byteBuffer = ldk_server.ListChannelsRequest.encode(request).finish();
    const endpoint = '/channel/list';
    const response = await axios.post(`${ baseUrl }${ endpoint } `, byteBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      responseType: 'arraybuffer'
    });

    let deserResponse = ldk_server.ListChannelsResponse.decode(response.data);
    console.log(`${ endpoint } Response: ` + JSON.stringify(deserResponse, undefined, 2));

    return deserResponse;

  } catch (error) {
    console.error('Request Error:', error);
    throw new Error('Failed to fetch ListChannelsRequest.');
  }
}

export async function getNodeBalances(): Promise<ldk_server.GetBalancesResponse> {
  try {
    const request = ldk_server.GetBalancesRequest.create({});
    const byteBuffer = ldk_server.GetBalancesRequest.encode(request).finish();
    const endpoint = '/getNodeBalances';
    const response = await axios.post(`${baseUrl}${endpoint} `, byteBuffer, {
      headers: {
        'Content-Type': 'application/octet-stream',
      },
      responseType: 'arraybuffer'
    });

    let deserResponse = ldk_server.GetBalancesResponse.decode(response.data);
    console.log(`${endpoint} Response: ` + JSON.stringify(deserResponse, undefined, 2));

    return deserResponse;

  } catch (error) {
    console.error('Request Error:', error);
    throw new Error('Failed to fetch GetBalancesRequest.');
  }
}


export async function fetchLatestInvoices() {
  getNodeStatus();
  getNodeBalances();
  listChannels();

  const client = await pool.connect();
  const data = await client.query<LatestInvoiceRaw>('\
    SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id\
    FROM invoices\
    JOIN customers ON invoices.customer_id = customers.id\
    ORDER BY invoices.date DESC\
    LIMIT 5');

  const latestInvoices = data.rows.map((invoice) => ({
    ...invoice,
    amount: formatCurrency(invoice.amount),
  }));
  return latestInvoices;
}

export async function fetchCardData() {
  // You can probably combine these into a single SQL query
  // However, we are intentionally splitting them to demonstrate
  noStore();
  const balances = getNodeBalances();
  return balances;
}


//   const client = await pool.connect(); // how to initialize multiple queries in parallel with JS.
//   const invoiceCountPromise = client.query('SELECT COUNT(*) FROM invoices');
//   const customerCountPromise = client.query('SELECT COUNT(*) FROM customers');
//   const invoiceStatusPromise = client.query('SELECT\
//        SUM(CASE WHEN status = \'paid\' THEN amount ELSE 0 END) AS "paid",\
//        SUM(CASE WHEN status = \'pending\' THEN amount ELSE 0 END) AS "pending"\
//        FROM invoices');

//   const data = await Promise.all([
//     invoiceCountPromise,
//     customerCountPromise,
//     invoiceStatusPromise,
//   ]);

//   const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
//   const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
//   const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
//   const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

//   return {
//     numberOfCustomers,
//     numberOfInvoices,
//     totalPaidInvoices,
//     totalPendingInvoices,
//   };
// } catch (error) {
//   console.error('Database Error:', error);
//   throw new Error('Failed to fetch card data.');
// }

const ITEMS_PER_PAGE = 6;

export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    noStore();
    const client = await pool.connect();
    const invoices = await client.query<InvoicesTable>(`
SELECT
invoices.id,
  invoices.amount,
  invoices.date,
  invoices.status,
  customers.name,
  customers.email,
  customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
WHERE
customers.name ILIKE '%' || $1 || '%' OR
customers.email ILIKE '%' || $1 || '%' OR
invoices.amount::text ILIKE '%' || $1 || '%' OR
invoices.date::text ILIKE '%' || $1 || '%' OR
invoices.status ILIKE '%' || $1 || '%'
      ORDER BY invoices.date DESC
      LIMIT $2 OFFSET $3
  `, [query, ITEMS_PER_PAGE, offset]);
    client.release();
    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    noStore();
    const client = await pool.connect();
    const count = await client.query(`
      SELECT COUNT(*)
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
WHERE
customers.name ILIKE '%' || $1 || '%' OR
customers.email ILIKE '%' || $1 || '%' OR
invoices.amount::text ILIKE '%' || $1 || '%' OR
invoices.date::text ILIKE '%' || $1 || '%' OR
invoices.status ILIKE '%' || $1 || '%'
  `, [query]);

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    noStore();
    const client = await pool.connect();
    const data = await client.query<InvoiceForm>(`SELECT\
invoices.id, \
invoices.customer_id, \
invoices.amount, \
invoices.status\
      FROM invoices\
      WHERE invoices.id = $1; \
`, [id]);

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));
    client.release();
    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    noStore();
    const client = await pool.connect();
    const data = await client.query<CustomerField>('SELECT\
        id,\
        name\
      FROM customers\
      ORDER BY name ASC\
    ');

    const customers = data.rows;
    client.release();
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    noStore();
    const client = await pool.connect();

    const data = await client.query<CustomersTableType>('SELECT\
      customers.id, \
      customers.name, \
      customers.email, \
      customers.image_url, \
      COUNT(invoices.id) AS total_invoices, \
      SUM(CASE WHEN invoices.status = \'pending\' THEN invoices.amount ELSE 0 END) AS total_pending, \
      SUM(CASE WHEN invoices.status = \'paid\' THEN invoices.amount ELSE 0 END) AS total_paid\
      FROM customers\
      LEFT JOIN invoices ON customers.id = invoices.customer_id\
      WHERE\
      customers.name ILIKE ${`%${query}%`} OR\
  customers.email ILIKE ${`%${query}%`} \
		GROUP BY customers.id, customers.name, customers.email, customers.image_url\
		ORDER BY customers.name ASC\
  ');

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export async function getUser(email: string) {
  try {
    noStore();
    const client = await pool.connect();
    const user = await client.query('SELECT * FROM users WHERE email=${email}');

    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

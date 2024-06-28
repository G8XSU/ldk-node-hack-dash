'use server';

import { z } from 'zod';
import { Pool } from 'pg';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({ invalid_type_error: 'Please select a customer.' }),
  amount: z.coerce.number().gt(0, { message: 'Please select an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], { invalid_type_error: 'Please select an invoice status.' }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export type State = {
  errors?: {
    custoemerId?: string[],
    amount?: string[],
    status?: string[]
  },
  message?: string | null;
};


export async function createInvoice(prevState: State, formData: FormData) {
  try {
    const validatedFields = CreateInvoice.safeParse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status')
    });

    if (!validatedFields.success) {
      console.log(validatedFields);
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to create Invoice.'
        ,

      }
    }

    const { customerId, amount, status } = validatedFields.data;
    const amountInCents = amount * 100;
    const date = new Date().toISOString().split('T')[0];

    const client = await pool.connect();

    client.query(`INSERT INTO invoices (customer_id, amount, status, date)
    VALUES ($1, $2, $3, $4)`, [customerId, amountInCents, status, date]);

    client.release();
  } catch (e) {
    return 'DatabaseError: Failed to create Invoice';
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id: string, formData: FormData) {
  try {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    const client = await pool.connect();

    await client.query(`
    UPDATE invoices
    SET customer_id = $1, amount = $2, status = $3
    WHERE id = $4
  `, [customerId, amountInCents, status, id]);

  } catch (e) {
    return 'Database Error: Failed to update Invoice';
  }
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  throw new Error('duba');
  try {
    const client = await pool.connect();

    client.query(`DELETE FROM INVOICES where id =$1`, [id]);
  } catch (e) {
    return 'Database Error: Failed to delete Invoice';
  }
  revalidatePath('/dashboard/invoices');

}

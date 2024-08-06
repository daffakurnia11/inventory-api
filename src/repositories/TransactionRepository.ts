import { v4 as uuidv4 } from "uuid";
import { Transaction } from "../models/Transaction";
import db from "../config/database";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import TransactionQueries from "../queries/TransactionQueries";

class TransactionRepository {
  async list(): Promise<Transaction[] | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(TransactionQueries.listTransactionsQuery);
    if (rows.length === 0) return null;
    return rows as Transaction[];
  }

  async create(transactionData: Transaction): Promise<Transaction | null> {
    const id = uuidv4();
    await db
      .promise()
      .query<ResultSetHeader>(TransactionQueries.createTransactionQuery, [
        id,
        transactionData.user_id,
        transactionData.product_id,
        transactionData.quantity,
        transactionData.state,
      ]);

    const transaction = await this.findById(id);
    return transaction;
  }

  async findById(id: string): Promise<Transaction | null> {
    const [rows] = await db
      .promise()
      .query<RowDataPacket[]>(TransactionQueries.findTransactionByIdQuery, [
        id,
      ]);
    if (rows.length === 0) return null;
    return rows[0] as Transaction;
  }

  async bulkCreate(
    transactionsData: Transaction[]
  ): Promise<Transaction[] | null> {
    const ids = transactionsData.map(() => uuidv4());

    const queryString = transactionsData
      .map(() => "(?, ?, ?, ?, ?)")
      .join(", ");

    const values = transactionsData.flatMap((transaction, index) => [
      ids[index],
      transaction.user_id,
      transaction.product_id,
      transaction.quantity,
      transaction.state,
    ]);

    await db
      .promise()
      .query<ResultSetHeader>(
        TransactionQueries.bulkCreateTransactionsQuery(queryString),
        values
      );

    const createdTransactions = await Promise.all(
      ids.map((id) => this.findById(id))
    );

    return createdTransactions as Transaction[];
  }
}

export default new TransactionRepository();

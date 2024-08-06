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
    return rows[0] as Transaction;
  }
}

export default new TransactionRepository();

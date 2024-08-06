import { Transaction } from "../models/Transaction";
import TransactionRepository from "../repositories/TransactionRepository";

class TransactionService {
  async list() {
    const transactions = await TransactionRepository.list();
    return transactions;
  }

  async create(transactionData: Transaction) {
    const transaction = await TransactionRepository.create(transactionData);
    return transaction;
  }

  async bulkCreate(transactionsData: Transaction[]) {
    const transaction = await TransactionRepository.bulkCreate(transactionsData);
    return transaction;
  }
}

export default new TransactionService();

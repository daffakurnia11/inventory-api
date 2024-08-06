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
}

export default new TransactionService();

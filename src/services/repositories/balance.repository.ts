import { Balance } from "./domain/balance"

export interface BalanceRepository{
    all(): Promise<Balance[]>;
    find(id: Number): Promise<Balance | null>;
    store(entry: Balance): Promise<void>;
    update(entry: Balance): Promise<void>;
    remove(id: Number): Promise<void>;
    findByUserId(userId: Number): Promise<Balance | null>
}
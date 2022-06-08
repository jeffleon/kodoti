import conector from '../../../../common/persistence/mysql.persistence';
import { Balance } from '../../domain/balance';
import { BalanceRepository } from '../../balance.repository';

export class BalanceMySQLRepository implements BalanceRepository{
    public async all(): Promise<Balance[]> {
        const [row] = await conector.execute(
            `SELECT * FROM wallet_balance ORDER BY id DESC`
        );
        return row as Balance[];
    }

    public async find(id: Number): Promise<Balance | null>{
        const [row]: any[] = await conector.execute(
            `SELECT * FROM wallet_balance WHERE id = ?`,
            [id]
        );
        
        if(row.length){
            return row[0] as Balance;
        }
        return null;
    }

    public async findByUserId(user_id: Number): Promise<Balance | null>{
        const [row]: any[] = await conector.execute(
            `SELECT * FROM wallet_balance WHERE user_id = ? `,
            [user_id]
        );
        
        if(row.length){
            return row[0] as Balance;
        }
        return null;
    }

    public async store(entry: Balance): Promise<void> {
        const now = new Date();

        await conector.execute(
            'INSERT INTO wallet_balance(user_id, amount, created_at) VALUES(?, ?, ?)',
            [entry.user_id, entry.amount, now]
        );
    }

    public async update(entry: Balance): Promise<void> {
        const now = new Date();

        await conector.execute(
            'UPDATE wallet_balance SET user_id = ?, amount = ?, updated_at = ? WHERE id = ?',
            [entry.user_id, entry.amount, now, entry.id]
        );
    }

    public async remove(id: Number): Promise<void>{
        await conector.execute(`DELETE FROM wallet_balance WHERE id = ?`, 
        [id]);
    }
}
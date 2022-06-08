import conector from '../../../../common/persistence/mysql.persistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository';

export class SubscriptionMySQLRepository implements SubscriptionRepository{
    public async all(): Promise<Subscription[]> {
        const [row] = await conector.execute(
            `SELECT * FROM wallet_subscription ORDER BY id DESC`
        );
        return row as Subscription[];
    }

    public async find(id: Number): Promise<Subscription | null>{
        const [row]: any[] = await conector.execute(
            `SELECT * FROM wallet_subscription WHERE id = ?`,
            [id]
        );
        
        if(row.length){
            return row[0] as Subscription;
        }
        return null;
    }

    public async findByUserAndCode(user_id: Number, code: string): Promise<Subscription | null>{
        const [row]: any[] = await conector.execute(
            `SELECT * FROM wallet_subscription WHERE user_id = ? AND code = ? `,
            [user_id, code]
        );
        
        if(row.length){
            return row[0] as Subscription;
        }
        return null;
    }

    public async store(entry: Subscription): Promise<void>{
        const now = new Date();
        console.log("entry", entry);
        const [row]: any[] = await conector.execute(
            `INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at, updated_at) VALUES(?, ?, ?, ?, ?, ?)`,
            [entry.user_id, entry.code, entry.amount, entry.cron, now, now]
        );
    }

    public async update(entry: Subscription): Promise<void>{
        const now = new Date();
        const [row]: any[] = await conector.execute(
            `UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?`,
            [entry.user_id, entry.code, entry.amount, entry.cron, now, entry.id]
        );
    }

    public async remove(id: Number): Promise<void>{
        await conector.execute(`DELETE FROM wallet_subscription WHERE id = ?`, 
        [id]);
    }
}
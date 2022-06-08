import conector from '../../../../common/persistence/mysql.persistence';
import { Movement } from '../../domain/movement';
import { MovementRepository } from '../../movement.repository';

export class MovementMySQLRepository implements MovementRepository{
    public async all(): Promise<Movement[]> {
        const [row] = await conector.execute(
            `SELECT * FROM wallet_movement ORDER BY id DESC`
        );
        return row as Movement[];
    }

    public async find(id: Number): Promise<Movement | null>{
        const [row]: any[] = await conector.execute(
            `SELECT * FROM wallet_movement WHERE id = ?`,
            [id]
        );
        
        if(row.length){
            return row[0] as Movement;
        }
        return null;
    }

    public async findByUserAndCode(user_id: Number, code: string): Promise<Movement | null>{
        const [row]: any[] = await conector.execute(
            `SELECT * FROM wallet_movement WHERE user_id = ? AND code = ? `,
            [user_id, code]
        );
        
        if(row.length){
            return row[0] as Movement;
        }
        return null;
    }

    public async store(entry: Movement): Promise<void> {
        const now = new Date();

        await conector.execute(
            'INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES(?, ?, ?, ?)',
            [entry.user_id, entry.type, entry.amount, now]
        );
    }

    public async update(entry: Movement): Promise<void> {
        const now = new Date();

        await conector.execute(
            'UPDATE wallet_movement SET user_id = ?, type = ?, amount = ?, updated_at = ? WHERE id = ?',
            [entry.user_id, entry.type, entry.amount, now, entry.id]
        );
    }

    public async remove(id: Number): Promise<void>{
        await conector.execute(`DELETE FROM wallet_movement WHERE id = ?`, 
        [id]);
    }
}
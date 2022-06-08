import { ApplicationException } from "../common/exception/aplication.exception";
import { Subscription } from "./repositories/domain/subscription";
import { SubscriptionRepository } from "./repositories/subscription.repository";

export class SubscriptionService {
    constructor(private readonly subscriptionRepository:SubscriptionRepository){}

    public async all(){
        return await this.subscriptionRepository.all();
    }

    public async find(id: Number): Promise<Subscription | null>{
        return await this.subscriptionRepository.find(id);
    }

    public async store(entry: SubscriptionCreateDto): Promise<void>{
        const oringinEntry = await this.subscriptionRepository.findByUserAndCode(entry.user_id, entry.code);
        if(!oringinEntry){
            return this.subscriptionRepository.store(entry as Subscription);
        } else {
          throw new ApplicationException('User subscription already exists.')  
        }
    }

    public async update(id: number,entry: SubscriptionUpdateDto): Promise<void>{
        let oringinEntry = await this.subscriptionRepository.find(id);
        if(oringinEntry){
            oringinEntry.code = entry.code;
            oringinEntry.amount = entry.amount;
            oringinEntry.cron = entry.cron;
            await this.subscriptionRepository.update(oringinEntry);
        } else {
            throw new ApplicationException('Subscription not found')  
        }
    }

    public async remove(id: number): Promise<void>{
        return await this.subscriptionRepository.remove(id);
    }
}
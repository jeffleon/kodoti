import express from "express";
import { createContainer, asClass } from 'awilix';
import { TestService } from './services/test.service';
import { scopePerRequest } from 'awilix-express';
import { SubscriptionMySQLRepository } from "./services/repositories/impl/mysql/subscription.repository";
import { SubscriptionService } from "./services/subscription.service";
import { MovementMySQLRepository } from "./services/repositories/impl/mysql/movement.repository";
import { BalanceMySQLRepository } from "./services/repositories/impl/mysql/balance.repository";
import { MovementService } from "./services/movement.service";

export default (app: express.Application) => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        // repositories
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        movementRepository: asClass(MovementMySQLRepository).scoped(),
        balanceRepository: asClass(BalanceMySQLRepository).scoped(),
        // services
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
};

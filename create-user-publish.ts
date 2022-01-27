import { CreateUserPublishBreaker } from "./circuit-breaker/create-user-on-topic";
import { getRequest } from "./request";

export class CreateUserPublish {
    createUserPublishBreaker!: CreateUserPublishBreaker;

    constructor(private topic: string, private readonly client: any) {
        this.createUserPublishBreaker = CreateUserPublishBreaker.init(getRequest)
    }

    async sendMessages(messages: CreateUserPublish.Message | CreateUserPublish.Message[]): Promise<string> {
        const { breaker } = this.createUserPublishBreaker;
        breaker.fallback(() => ({ status: 'ok from cache' }));

        await breaker.fire('Uma mensagem');
        if (breaker.closed) return 'CLOSED';
        if (breaker.opened) return 'OPENED';
        if (breaker.halfOpen) return 'HALF_OPEN';
        return '';
    }
}

export namespace CreateUserPublish {
    export type Message = {
        name: string
    }
}

import CircuitBreaker from "opossum";

export class CreateUserPublishBreaker {
    breaker!: CircuitBreaker;

    constructor(action: any) {
        this.breaker = new CircuitBreaker(action, {
            timeout: 10000,
            errorThresholdPercentage: 50,
            resetTimeout: 30000,
        });
    }

    initListener() {
        this.breaker.on('success', (result) => console.log('rc.topic.publish.create_user.breaker.success'));
        this.breaker.on('timeout', () => console.log('rc.topic.publish.create_user.breaker.timeout'));
        this.breaker.on('reject', () => console.log('rc.topic.publish.create_user.breaker.reject'));
        this.breaker.on('open', () => console.log('rc.topic.publish.create_user.breaker.open'));
        this.breaker.on('halfOpen', () => console.log('rc.topic.publish.create_user.breaker.half_open'));
        this.breaker.on('close', () => console.log('rc.topic.publish.create_user.breaker.close'));
        this.breaker.on('fallback', (data) => console.log('rc.topic.publish.create_user.breaker.fallback'));
    }

    static init(action: any) {
        const createUserPublishBreaker = new CreateUserPublishBreaker(action);
        createUserPublishBreaker.initListener();

        return createUserPublishBreaker;
    }
}
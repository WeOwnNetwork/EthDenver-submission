export type EventCallback<T> = (event: T) => void | Promise<void>;

/**
 * Lightweight async EventHub for decoupled server-side components.
 */
export class EventHub {
    private readonly subscribers: Record<string, Array<EventCallback<unknown>>> = {};

    subscribeEvent<T extends object>(eventName: string, callback: EventCallback<T>): () => void {
        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = [];
        }

        this.subscribers[eventName].push(callback as EventCallback<unknown>);

        return () => {
            const listeners = this.subscribers[eventName] || [];
            this.subscribers[eventName] = listeners.filter((subscriber) => subscriber !== callback);
            if (this.subscribers[eventName].length === 0) {
                delete this.subscribers[eventName];
            }
        };
    }

    async triggerEvent<T extends object>(eventName: string, event: T): Promise<void> {
        const listeners = this.subscribers[eventName] || [];
        if (listeners.length === 0) return;

        await Promise.all(
            listeners.map(async (listener) => {
                await listener(event);
            })
        );
    }
}

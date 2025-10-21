import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import type { IMessage } from "@stomp/stompjs";

class WebSocketService {
    private client: Client | null = null;
    private connected = false;

    connect(
        endpoint: string,
        subscriptions: { topic: string; handler: (data: any) => void }[],
        onConnected?: () => void
    ) {
        if (this.client && this.connected) return;

        const socket = new SockJS(endpoint);

        this.client = new Client({
            webSocketFactory: () => socket as any,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                this.connected = true;
                console.log(`✅ Conectado a ${endpoint}`);
                subscriptions.forEach(({ topic, handler }) => {
                    this.client?.subscribe(topic, (message: IMessage) => {
                        try {
                            const parsed = JSON.parse(message.body);
                            handler(parsed);
                        } catch (err) {
                            console.error(`❌ Error parseando mensaje en ${topic}:`, err);
                        }
                    });
                });
                onConnected?.();
            },
            onDisconnect: () => {
                this.connected = false;
                console.log(`❌ Desconectado de ${endpoint}`);
            },
        });

        this.client.activate();
    }

    publish(destination: string, body: any) {
        if (!this.client || !this.connected) {
            console.warn("⚠️ WebSocket no conectado aún");
            return;
        }
        this.client.publish({
            destination,
            body: JSON.stringify(body),
        });
    }

    disconnect() {
        this.client?.deactivate();
        this.client = null;
        this.connected = false;
    }
}

export const socketService = new WebSocketService();

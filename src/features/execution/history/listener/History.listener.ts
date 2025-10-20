import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

interface HistoryListenerListenerProps {
    onChange: (data: any) => void;
    onInitialData: (data: any[]) => void;
}

export default function HistoryListenerListener({
    onChange,
    onInitialData,
}: HistoryListenerListenerProps) {
    const clientRef = useRef<Client | null>(null);
    const isInitializedRef = useRef(false);

    useEffect(() => {
        if (isInitializedRef.current) return;
        isInitializedRef.current = true;

        const socket = new SockJS("http://localhost:8080/ws-history");

        const stompClient = new Client({
            webSocketFactory: () => socket as any,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log("✅ Conectado a WebSocket (/history)");

                stompClient.subscribe("/topic/history/initial", (message) => {
                    if (message.body) {
                        try {
                            const data = JSON.parse(message.body);
                            onInitialData(data);
                        } catch (error) {
                            console.error("❌ Error parseando datos iniciales:", error);
                        }
                    }
                });

                stompClient.subscribe("/topic/history/change", (message) => {
                    if (message.body) {
                        try {
                            const data = JSON.parse(message.body);
                            onChange(data);
                        } catch (error) {
                            console.error("❌ Error parseando cambio:", error);
                        }
                    }
                });

                stompClient.publish({
                    destination: "/app/history/initial",
                    body: "",
                });
            },
            onDisconnect: () => console.log("❌ Desconectado de WebSocket (/history)"),
            onStompError: (frame) =>
                console.error("❌ Error STOMP (/history):", frame.headers["message"]),
        });

        clientRef.current = stompClient;
        stompClient.activate();

        return () => {
            isInitializedRef.current = false;
            if (clientRef.current) {
                clientRef.current.deactivate();
                clientRef.current = null;
            }
        };
    }, [onChange, onInitialData]);

    return null;
}

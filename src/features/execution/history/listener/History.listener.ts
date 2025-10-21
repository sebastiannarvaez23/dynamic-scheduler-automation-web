import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";


interface HistoryListenerProps {
    onChange: (data: any) => void;
    onInitialData: (data: any[]) => void;
}

const HistoryListener = forwardRef(({ onChange, onInitialData }: HistoryListenerProps, ref) => {
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
                            const response = JSON.parse(message.body);
                            const data = response.content;
                            const totalElements = response.totalElements;
                            onInitialData(data);
                        } catch (error) {
                            console.error("❌ Error parseando datos iniciales:", error);
                        }
                    }
                });

                stompClient.subscribe("/topic/history/change", (message) => {
                    if (message.body) {
                        try {
                            const response = JSON.parse(message.body);
                            const data = response.content;
                            const totalElements = response.totalElements;
                            onChange(data);
                        } catch (error) {
                            console.error("❌ Error parseando cambio:", error);
                        }
                    }
                });

                stompClient.publish({
                    destination: "/app/history/get",
                    body: JSON.stringify({ page: 0, size: 10 }),
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

    useImperativeHandle(ref, () => ({
        requestPage: (page: number, size = 10) => {
            if (clientRef.current && clientRef.current.connected) {
                clientRef.current.publish({
                    destination: "/app/history/get",
                    body: JSON.stringify({ page, size }),
                });
            } else {
                console.warn("⚠️ WebSocket no conectado aún");
            }
        },
    }));

    return null;
});

export default HistoryListener;

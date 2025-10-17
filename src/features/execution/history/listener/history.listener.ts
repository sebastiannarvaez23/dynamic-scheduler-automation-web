import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

interface HistoryListenerProps {
    onChange: (data: any) => void;
    onInitialData: (data: any[]) => void;
}

export default function HistoryListener({ onChange, onInitialData }: HistoryListenerProps) {
    const clientRef = useRef<Client | null>(null);
    const isInitializedRef = useRef(false);

    useEffect(() => {

        if (isInitializedRef.current) return;
        isInitializedRef.current = true;

        console.log("🔌 Iniciando conexión WebSocket...");
        const socket = new SockJS("http://localhost:8080/ws-history");

        const stompClient = new Client({
            webSocketFactory: () => socket as any,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log("✅ Conectado a WebSocket");

                stompClient.subscribe("/topic/history/initial", (message) => {
                    if (message.body) {
                        try {
                            const data = JSON.parse(message.body);
                            console.log("📦 Datos iniciales recibidos:", data.length, "documentos");
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
                            console.log("📨 Cambio recibido:", data);
                            onChange(data);
                        } catch (error) {
                            console.error("❌ Error parseando cambio:", error);
                        }
                    }
                });

                console.log("📡 Solicitando datos iniciales...");
                stompClient.publish({
                    destination: "/app/history/initial",
                    body: ""
                });
            },
            onDisconnect: () => {
                console.log("❌ Desconectado de WebSocket");
            },
            onStompError: (frame) => {
                console.error("❌ Error STOMP:", frame.headers['message']);
            },
        });

        clientRef.current = stompClient;
        stompClient.activate();

        return () => {
            console.log("🔌 Desactivando conexión WebSocket");
            isInitializedRef.current = false;
            if (clientRef.current) {
                clientRef.current.deactivate();
                clientRef.current = null;
            }
        };
    }, []);

    return null;
}
import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";

import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";


interface HistoryListenerProps {
    onChange: (data: any, totalElements: number) => void;
    onInitialData: (data: any[], totalElements: number, page?: number) => void;
}

const HistoryListener = forwardRef(({ onChange, onInitialData }: HistoryListenerProps, ref) => {
    const clientRef = useRef<Client | null>(null);
    const onChangeRef = useRef(onChange);
    const onInitialDataRef = useRef(onInitialData);

    useEffect(() => {
        onChangeRef.current = onChange;
        onInitialDataRef.current = onInitialData;
    }, [onChange, onInitialData]);

    useEffect(() => {
        if (clientRef.current) {
            console.log("⚠️ WebSocket ya está conectado, ignorando...");
            return;
        }

        console.log("🔌 Iniciando conexión WebSocket...");
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
                        const response = JSON.parse(message.body);
                        console.log("📦 Datos paginados recibidos:", response);
                        onInitialDataRef.current(response.content, response.totalElements, response.page);
                    }
                });

                stompClient.subscribe("/topic/history/change", (message) => {
                    if (message.body) {
                        try {
                            const response = JSON.parse(message.body);
                            console.log("🔄 Cambio individual recibido:", response);
                            onChangeRef.current(response, response.totalElements);
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
            onDisconnect: () => {
                console.log("❌ Desconectado de WebSocket (/history)");
            },
            onStompError: (frame) => {
                console.error("❌ Error STOMP (/history):", frame.headers["message"]);
            },
        });

        clientRef.current = stompClient;
        stompClient.activate();

        return () => {
            console.log("🧹 Limpiando conexión WebSocket...");
            if (clientRef.current) {
                clientRef.current.deactivate();
                clientRef.current = null;
            }
        };
    }, []);

    useImperativeHandle(ref, () => ({
        requestPage: (page: number, size = 10, filters?: Record<string, any>) => {
            if (clientRef.current && clientRef.current.connected) {
                console.log(`📤 Solicitando página ${page} con filtros:`, filters);
                clientRef.current.publish({
                    destination: "/app/history/get",
                    body: JSON.stringify({ page, size, filters }),
                });
            } else {
                console.warn("⚠️ WebSocket no conectado aún");
            }
        },
    }));

    return null;
});

export default HistoryListener;
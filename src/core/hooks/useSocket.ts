import { useEffect, useRef } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import type { Frame, IMessage } from "@stomp/stompjs";
import { useDispatch } from "react-redux";
import { setAlert } from "../store/alert/slice";
import type { AppDispatch } from "../store/store";
import type { History } from "../../features/execution/history/interfaces/history.interface";

interface SocketMessage {
    type: string;
    data: any;
}

export const useSocket = () => {
    const dispatch = useDispatch<AppDispatch>();
    const clientRef = useRef<Client | null>(null);
    const isInitRef = useRef(false);

    useEffect(() => {
        if (isInitRef.current) return;
        isInitRef.current = true;

        const sockJsUrl = import.meta.env.VITE_SOCKET_URL || "http://localhost:8080/ws-history";

        const client = new Client({
            webSocketFactory: () => new SockJS(sockJsUrl) as any,
            reconnectDelay: 5000,
            heartbeatIncoming: 0,
            heartbeatOutgoing: 20000,
            onConnect: (frame: Frame) => {
                console.log("🌐 STOMP global conectado", frame);

                client.subscribe("/topic/history/change", (msg: IMessage) => {
                    if (!msg.body) return;
                    try {
                        const message: SocketMessage = JSON.parse(msg.body);
                        console.log("🌐 [global socket] mensaje:", message);

                        if (message.type === "INSERT") {
                            const data = message.data as History;
                            dispatch(
                                setAlert({
                                    type: "info",
                                    message: `Se inició la ejecución de "${data.task?.name ?? "Desconocida"}" para la empresa "${data.company?.name ?? "Desconocida"}"`,
                                })
                            );
                        }
                    } catch (err) {
                        console.error("❌ Error parseando mensaje global STOMP:", err);
                    }
                });
            },
            onStompError: (frame) => {
                console.error("❌ STOMP error (global):", frame.headers, frame.body);
            },
            onDisconnect: () => {
                console.log("🔌 STOMP global desconectado");
            },
        });

        client.activate();
        clientRef.current = client;

        return () => {
            isInitRef.current = false;
            client.deactivate();
            clientRef.current = null;
            console.log("🧹 STOMP global desmontado");
        };
    }, [dispatch]);

    return clientRef;
};

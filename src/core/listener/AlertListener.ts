import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Swal from "sweetalert2";

import { clearAlert } from "../store/alert/slice";
import type { RootState } from "../store/store";

const AlertListener = () => {
    const dispatch = useDispatch();
    const { type, message } = useSelector((state: RootState) => state.alert);

    useEffect(() => {
        if (type && message) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 4000,
                timerProgressBar: true,
                width: '30%',
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
            });

            Toast.fire({
                icon: type,
                title: message,
            });

            dispatch(clearAlert());
        }
    }, [type, message, dispatch]);

    return null;
};

export default AlertListener;

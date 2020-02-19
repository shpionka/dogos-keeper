import * as actionTypes from "../../actionTypes";

export const queueNotification = (type, message) => {
    return {
        type: actionTypes.QUEUE_NOTIFICATION,
        notificationType: type,
        message
    }
};

export const dequeueNotification = () => {
    return {
        type: actionTypes.DEQUEUE_NOTIFICATION,
    }
};


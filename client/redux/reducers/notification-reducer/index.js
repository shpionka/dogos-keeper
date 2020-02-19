import * as actionTypes from '../../actionTypes';

const initialState = {
    queue: []
};

const notificationsQueueReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.QUEUE_NOTIFICATION:
            const queue = [...state.queue, {type: action.notificationType, message: action.message}];
            return {
                ...state,
                queue: queue
            };
        case actionTypes.DEQUEUE_NOTIFICATION:
            state.queue.pop();
            return {
                ...state,
                queue: state.queue
            };
        default:
            return state;
    }
};

export default notificationsQueueReducer;

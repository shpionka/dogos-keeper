import Noty from 'noty';

export const showNotification = (type = 'success', message) => {
     new Noty({
        theme: 'mint',
        type: type,
        layout: 'topRight',
        text: message,
        timeout: 3000,
        progressBar: true,
        closeWith: ['click']
    }).show();
};

//Message JS object
const moment = require('moment');

//Formats message into username. text and time provided by moment
function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
};

module.exports = formatMessage;
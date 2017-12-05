// import moment from 'moment';
// Can't just import moment here because it will create this function calling itself

const moment = require.requireActual('moment');
// This will import the original library

export default (timestamp = 0) => {
    return moment(timestamp);
};
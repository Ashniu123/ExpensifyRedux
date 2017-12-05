import moment from 'moment';

export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 199,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 100220,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 5000,
    createdAt: moment(0).add(4, 'days').valueOf()
}];

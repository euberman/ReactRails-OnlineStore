import {ADD_ADDRESS, ADD_PAYMENT, CLEAR_CHECKOUT} from '../actionTypes'

const initialState = {
    user_id: '',
    subtotal: 0,
    salesTaxRate: '0.0825',
    salesTax: 0,
    total: 0,
    payment: {
        cardNumber: '',
        cvv: '',
        expDate: ''
    },
    address: {
        firstName: '',
        lastname: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: 'US'
    }
}

const checkoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_ADDRESS:{
            console.log('address', action.address)
            //console.log('currentAddress', action.currentAddress)
            return {
                ...state,
                address: {
                    firstname: action.payload.firstname,
                    lastname: action.payload.lastname,
                    street: action.payload.street,
                    city: action.payload.city,
                    state: action.payload.state,
                    zip: action.payload.zip
                } 
            }
        }
        case ADD_PAYMENT:{
            return {
                ...state,
                payment: {
                    cardNumber: '',
                    cvv: '',
                    expDate: ''
                } 
            }
        }
        case CLEAR_CHECKOUT:{
            return {
                ...initialState
            }
        }
        default:
            return state;

    }
};
export default checkoutReducer;
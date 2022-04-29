import { ActionTypes } from "../constants/action-types";

const initialState = {
    users : [
        {
            id: 1,
            name: 'User 1',
            email: 'test@gmail.com',
            password: 'Test@123',
            isLogin: false,
            birthdate: '01/01/1990',
            country : 'USA',
        },
    ],
};

export const userReducer = (state = initialState, {type, payload}) => {
   
    switch (type) {
        case ActionTypes.SET_USER:
            console.log(state.users);
            return { ...state, users: [...state.users, payload] };
        case ActionTypes.SET_LOGIN:
            return { ...state, users: state.users.map(user => {
                if(user.email === payload.email){
                    return {
                        ...user,
                        isLogin: true
                    }
                }
                return user;
            })};

        case ActionTypes.SET_LOGOUT:
            
            return { ...state, users: state.users.map(user => {
                if(user.email === payload.email){
                    console.log("In ",user.email, payload.email);
                    return {
                        ...user,
                        isLogin: false
                        // users : [...state.users]
                    }
                }
                return user;
            })};
        case ActionTypes.SET_BIRTHDATE:
            return { ...state, users: state.users.map(user => {
                if(user.email === payload.user.email){
                    return {
                        ...user,
                        birthdate: payload.date
                    }
                }
                return user;
            })};
        default:
            return state;
    }
}
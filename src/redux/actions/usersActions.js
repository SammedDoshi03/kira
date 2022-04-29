import { ActionTypes } from "../constants/action-types";


export const setUsers = (users) => {
    return {
        type: ActionTypes.SET_USER,
        payload: users
    }
}

export const setLogin = (user) => {
    return {
        type: ActionTypes.SET_LOGIN,
        payload: user
    }
}

export const setLogout = (user) => {
    return {
        type: ActionTypes.SET_LOGOUT,
        payload: user
    }
}

export const setBirthDate = (user, date) => {
    return {
        type: ActionTypes.SET_BIRTHDATE,
        payload: {
            user,
            date
        }
    }
}
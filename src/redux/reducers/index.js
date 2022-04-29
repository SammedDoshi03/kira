import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { siteReducer } from './siteReducer';
import { userReducer } from './userReducer';
import { articlesReducer } from './articlesReducer';

export const rootReducer = combineReducers({
    sites: siteReducer,
    users: userReducer,
    articles: articlesReducer,
});


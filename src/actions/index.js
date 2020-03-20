import _ from 'lodash'
import placeholder from '../api/placeholder'


export const fetchPosts = (dispacth) => {
    return async (dispacth) => {
        const response = await placeholder.get('/posts'); 
        
        dispacth({ type: 'FETCH_POSTS', payload: response.data });
    }
};

export const fetchPostsAndUsers = () => async (dispacth, getState) => {
    await dispacth(fetchPosts());
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    userIds.forEach(id => dispacth(fetchUser(id)));
};



export const fetchUser = id => {
    return async (dispacth) => {
        const response = await placeholder.get(`/users/${id}`)

        dispacth({ type: 'FETCH_USER', payload: response.data });
    }
};


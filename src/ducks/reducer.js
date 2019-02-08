const initialState = {
    id: 0,
    username: '',
    profile_pic: ''
};

export default function reducer(state = initialState, action){
    const { type, payload } = action;
    switch(type){
        default:
            return state;
    }
}
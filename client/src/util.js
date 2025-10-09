const getCurrentUser = () => {
    const user = localStorage.getItem('LoggedInUser');
    if(user) {
        return JSON.parse(user);
    }
    else{
        return null;
    }
};

export { getCurrentUser };
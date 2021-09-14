export const getName = ({ userProfileReducer }) => {
  return userProfileReducer.userName;
};

export const getUserData = ({ userProfileReducer }) => {
  return userProfileReducer;
};

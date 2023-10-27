import { createContext } from 'react';
import auth from './auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data } = auth.getProfile();
  return <UserContext.Provider value={{ currentUser: data }}>{children}</UserContext.Provider>;
};

export default UserContext;

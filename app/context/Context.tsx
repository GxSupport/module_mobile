import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from 'react';
import {getStorage} from '../helpers/Storage.ts';

interface ContextType {
  token?: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  isLoadToken?: boolean;
}

export const Context = createContext<ContextType | undefined>(undefined);

interface ContextProviderProps {
  children: ReactNode;
}
export const ContextProvider: React.FC<ContextProviderProps> = ({children}) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoadToken, setIsLoadToken] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      try {
        const resToken = await getStorage('access_token');
        if (resToken) {
          setToken(resToken);
        }
      } catch (error) {
        console.error('Xatolik: token olishda', error);
      } finally {
        setIsLoadToken(false);
      }
    })();
  }, []);
  return (
    <Context.Provider value={{token, setToken, isLoadToken}}>
      {children}
    </Context.Provider>
  );
};

export const useCustomContext = (): ContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      'CustomContext hookni faqat ContextProvider ichida ishlatish kerak',
    );
  }
  return context;
};

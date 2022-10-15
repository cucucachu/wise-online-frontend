import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext, IAuthContext } from './contexts/AuthContext';
import { ProctorConfigContext } from './contexts/ProctorConfigContext';

export const useQuery = () => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

export const useAuth = (): IAuthContext => {
  return React.useContext(AuthContext)!;
}

export const useProctorConfig = () => {
  return React.useContext(ProctorConfigContext);
}

export const useIsLoggedIn = (): boolean => {
  // TODO: Check if this is right
  const isLoggedIn = !!sessionStorage.getItem('isLoggedIn');
  return isLoggedIn;
};

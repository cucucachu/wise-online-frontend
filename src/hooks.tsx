import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { AuthContext, IAuthContext } from './contexts/AuthContext';
import { ProctorConfigContext } from './contexts/ProctorConfigContext';
import { SchoolFeature } from './types';

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
  const auth = useAuth();
  return !!auth.user;
};

export const useIsFeatureEnabled = (featureName: SchoolFeature): boolean => {
  const auth = useAuth();
  return auth.school?.enabledFeatures?.includes(featureName) ?? false;
}


export const AppConfig = {
  isInClassEnabled: process.env.REACT_APP_IN_CLASS_ENABLED === 'true',
  apiUrl: process.env.REACT_APP_API_URL!,
}
console.log(AppConfig, process.env.REACT_APP_IN_CLASS_ENABLED)
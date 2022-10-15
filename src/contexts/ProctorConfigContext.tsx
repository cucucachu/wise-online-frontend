import * as React from 'react';

export type IProctorConfigContext = {
  screenshotInterval: number;
  setScreenshotInterval(value: number): void;
  webcamInterval: number
  setWebcamInterval(value: number): void;
}

const DEFAULT_SCREENSHOT_INTERVAL = 10;
const DEFAULT_WEBCAM_INTERVAL = 10;

export const ProctorConfigContext = React.createContext<IProctorConfigContext>({
  screenshotInterval: DEFAULT_SCREENSHOT_INTERVAL,
  setScreenshotInterval: () => {},
  webcamInterval: DEFAULT_WEBCAM_INTERVAL,
  setWebcamInterval: () => {},
});

export const ProctorConfigProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [screenshotInterval, setScreenshotInterval] = React.useState(DEFAULT_SCREENSHOT_INTERVAL);
  const [webcamInterval, setWebcamInterval] = React.useState(DEFAULT_WEBCAM_INTERVAL);

  return (
    <ProctorConfigContext.Provider value={{ screenshotInterval, setScreenshotInterval, webcamInterval, setWebcamInterval }}>
      {children}
    </ProctorConfigContext.Provider>
  );
}


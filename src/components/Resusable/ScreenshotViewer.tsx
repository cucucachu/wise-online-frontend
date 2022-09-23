import * as React from "react";

const ScreenshotViewerContainer: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return <div className="screenshot-slide-viewer">{children}</div>;
};

const ScreenshotViewerImageContainer: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <div className="row">
      <div className="col">
        <div className="image-holder">{children}</div>
      </div>
    </div>
  );
};

type ScreenshotViewerSliderProps = {
  max: number;
  value: number;
  onChange(value: number): void;
};

const ScreenshotViewerSlider: React.FC<ScreenshotViewerSliderProps> = ({
  max,
  value,
  onChange,
}) => {
  const onChangeSlider: React.ChangeEventHandler<HTMLInputElement> =
    React.useCallback(
      (e) => {
        onChange(e.target.valueAsNumber);
      },
      [onChange]
    );

  return (
    <div className="row">
      <div className="col">
        <div className="slider-container">
          <input
            type="range"
            min="0"
            max={max}
            value={value}
            className="slider"
            onChange={onChangeSlider}
          />
        </div>
      </div>
    </div>
  );
};

type ScreenshotViewerPlayControlsProps = {
  onClickPlay(): void;
  onClickPause(): void;
  onClickNextIssue(): void;
  hasNext: boolean;
  infoText: string;
};

const ScreenshotViewerPlayControls: React.FC<
  ScreenshotViewerPlayControlsProps
> = ({ onClickNextIssue, onClickPause, onClickPlay, hasNext, infoText }) => {
  return (
    <div className="row">
      <div className="col-8">
        <button className="play-button" onClick={onClickPlay}>
          &#9656;
        </button>
        <button className="pause-button" onClick={onClickPause}>
          ||
        </button>
        {hasNext && (
          <span>
            <button className="issue-button" onClick={onClickNextIssue}>
              Next Issue
            </button>
          </span>
        )}
      </div>
      <div className="col-4 black align-right">{infoText}</div>
    </div>
  );
};

export const ScreenshotViewer = {
  Container: ScreenshotViewerContainer,
  ImageContainer: ScreenshotViewerImageContainer,
  Slider: ScreenshotViewerSlider,
  PlayControls: ScreenshotViewerPlayControls,
};

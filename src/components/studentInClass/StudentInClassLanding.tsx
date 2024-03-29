import * as React from "react";
import { Socket } from "socket.io-client";
import { RouteComponentProps } from "react-router-dom";

import { Course } from "../../types";
import {
  studentGetCourse,
  submitScreenshotForInClass,
} from "../../store/axios";
import { ProctorConfigContext } from "../../contexts/ProctorConfigContext";
// import {CodeEntry} from './Resusable/CodeEntry';

import { i18n } from "web-translate";
import { realtimeService } from "../../services/realtime";
import { Card } from "../Resusable/Card";
import "./StudentInClassLanding.css";
import { StudentCheckIcon } from "./StudentCheckIcon";
import { paths } from "../../paths";

const attendClass = require("../../Assets/images/attend-class.png");

type StudentInClassInSessionProps = RouteComponentProps<{
  courseId: string;
}>;

type UseScreenTrackingArgs = {
  screenVideoRef: React.MutableRefObject<HTMLVideoElement | null>;
  screenshotCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  onTakeScreenShot(screenshotUrl: string): void;
  onReceiveTabs(tabs: string[]): void;
};

const useScreenTracking = ({
  onReceiveTabs,
  screenVideoRef,
  screenshotCanvasRef,
  onTakeScreenShot,
}: UseScreenTrackingArgs) => {
  const [isScreenTracking, setIsScreenTracking] = React.useState(false);
  const [screenPermissionError, setScreenPermissionError] =
    React.useState(false);
  const { screenshotInterval } = React.useContext(ProctorConfigContext);
  const takeScreenShot = () => {
    const screenVideo = screenVideoRef.current;
    const screenshotCanvas = screenshotCanvasRef.current;
    if (screenshotCanvas && screenVideo) {
      screenshotCanvas.width = Math.min(screenVideo.videoWidth, 1200);
      screenshotCanvas.height =
        (screenVideo.videoHeight / screenVideo.videoWidth) *
        screenshotCanvas.width;
      const screenshotContext = screenshotCanvas.getContext("2d");

      if (screenshotContext) {
        screenshotContext.drawImage(
          screenVideo,
          0,
          0,
          screenshotCanvas.width,
          screenshotCanvas.height
        );
      }

      const screenshot = screenshotCanvas.toDataURL("image/jpeg");
      onTakeScreenShot(screenshot);
    }
  };

  const stopScreenVideo = React.useCallback(() => {
    const screenVideo = screenVideoRef.current;
    if (screenVideo) {
      const screenStream: any = screenVideo.srcObject;
      if (!screenStream) return;
      const tracks = screenStream.getTracks();
      tracks.forEach((track: any) => track.stop());
      setIsScreenTracking(false);
    }
  }, []);

  const startScreenVideo = React.useCallback(async () => {
    const screenVideo = screenVideoRef.current;
    if (screenVideo) {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia();

        screenVideo.srcObject = stream;

        const mediaSettings = stream.getVideoTracks()[0].getSettings() as any;
        const displaySurface = mediaSettings.displaySurface;
        screenVideo.play();

        if (displaySurface && displaySurface !== "monitor") {
          stopScreenVideo();
          setIsScreenTracking(false);
          setScreenPermissionError(true);
        } else {
          setIsScreenTracking(true);
        }
      } catch (err) {
        console.log("Screen error: ", err);
      }
    }
  }, [stopScreenVideo]);

  React.useEffect(() => {
    const minTime = screenshotInterval ? screenshotInterval * 1000 : 10 * 1000;

    let screenshotIntervalHandle: any;

    if (isScreenTracking) {
      screenshotIntervalHandle = setInterval(takeScreenShot, minTime);
    }

    const tabListener = (event: any) => {
      if (
        !event.data ||
        !event.data.type ||
        event.data.type !== "TABS_RESPONSE"
      ) {
        return;
      }

      if (event.data.tabs && event.data.tabs.length) {
        onReceiveTabs(event.data.tabs);
      }
    };

    window.addEventListener("message", tabListener);

    return () => {
      if (screenshotIntervalHandle) {
        clearInterval(screenshotIntervalHandle);
      }

      window.removeEventListener("message", tabListener);
    };
  }, [onReceiveTabs, isScreenTracking, screenshotInterval]);

  return {
    startScreenVideo,
    stopScreenVideo,
    isScreenTracking,
    screenPermissionError,
  };
};

type InClassInstructionsProps = {
  agreedToTerms: boolean;
  isScreenTracking: boolean;
  screenPermissionError: boolean;
  startInClass(): void;
  setAgreedToTerms(value: boolean): void;
  startScreenVideo(): void;
};

const InClassInstructions: React.FC<InClassInstructionsProps> = ({
  screenPermissionError,
  setAgreedToTerms,
  startScreenVideo,
  agreedToTerms,
  isScreenTracking,
  startInClass,
}) => {
  return (
    <>
      <div className="spacer-vertical" />
      <h1>{i18n("Join InClass")}</h1>
      <div className="row">
        <div className="col-sm">
          <Card>
            <Card.Body className="text-black">
              <h5>{i18n("Permissions & Information")}</h5>
              <p>
                <b>
                  <u>
                    {i18n(
                      "Your computer screen will be recorded and any/all intormation open on you screen will be avallable for your instructor to view during and atter through their Wise InClass application."
                    )}
                  </u>
                </b>
                {i18n(
                  "To avoid being flagged, do not visit any sites or use any applications that are not specifically allowed by your instructor."
                )}
              </p>
              <p>
                <b>
                  <u>
                    {i18n(
                      "If needed. take a moment to close any/all non-allowed windows."
                    )}
                  </u>
                </b>
              </p>
              <p>
                {i18n(
                  'Once vou have enabled permissions and agreed to the terms of service, click "Join" to join InClass'
                )}
              </p>
              <div>
                <label
                  className="student-in-class-cb-row"
                  htmlFor="in-class-terms"
                >
                  <input
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    checked={agreedToTerms}
                    type="checkbox"
                    id="in-class-terms"
                  />
                  {i18n("I Agree to the Terms of Service")}
                </label>
              </div>
              <div>
                <label
                  className="student-in-class-cb-row"
                  htmlFor="in-class-screen-cap"
                >
                  <input
                    onChange={() => startScreenVideo()}
                    checked={isScreenTracking}
                    type="checkbox"
                    id="in-class-screen-cap"
                  />
                  {i18n("Enable Screen Sharing")}
                </label>
                {screenPermissionError && (
                  <p className="red">You must share your entire screen.</p>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="spacer-vertical" />
      <div>
        <button
          disabled={!agreedToTerms || !isScreenTracking}
          onClick={startInClass}
          className="btn"
          type="button"
        >
          {i18n("Begin InClass")}
        </button>
      </div>
    </>
  );
};

type InClassLiveProps = {
  course: Course | null;
};

const InClassLive: React.FC<InClassLiveProps> = ({ course }) => {
  return (
    <>
      <div className="spacer-vertical" />
      <h1>
        {i18n("You're in ")} {course?.name}
      </h1>
      <div className="spacer-vertical" />
      <div className="green-success-welcome">
        <StudentCheckIcon />
      </div>
      <div className="spacer-vertical" />
      <div className="row">
        <div className="col-sm">
          <Card className="text-black">
            <Card.Body>
              <h5>{i18n("Keep this Window Open!")}</h5>
              <p>
                <b>
                  <u>
                    {i18n(
                      "Your screen is now being recorded. Closing this window before class is over will notity your instructor. "
                    )}
                  </u>
                </b>
                {i18n(
                  "We hope you have a great class. This window will close automatically arter your Instructor ends class."
                )}
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

const InClassFinished: React.FC<InClassLiveProps> = ({ course }) => {
  return (
    <>
      <div className="spacer-vertical" />
      <h1>{`Congrats, ${course?.name} is over! We hope you had a great class.`}</h1>
      <div className="spacer-vertical" />
      <div className="green-success-welcome">
        <StudentCheckIcon />
      </div>
      <div className="spacer-vertical" />
      <div className="row">
        <div className="col-sm">
          <a
            href={paths.studentInClassCourseList({})}
            className="btn"
            type="button"
          >
            {i18n("Go back")}
          </a>
        </div>
      </div>
    </>
  );
};

export const StudentInClassLanding: React.FC<StudentInClassInSessionProps> = (
  props
) => {
  const { courseId } = props.match.params;
  const [course, setCourse] = React.useState<Course | null>(null);

  const [agreedToTerms, setAgreedToTerms] = React.useState(false);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await studentGetCourse(courseId);
      setCourse(response.course);
    };

    fetch();
  }, [courseId]);

  const screenVideoRef = React.useRef<HTMLVideoElement | null>(null);
  const screenshotCanvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const [socket, setSocket] = React.useState<Socket | null>(null);

  const onTakeScreenShot = React.useCallback(
    (screenshotUrl: string) => {
      submitScreenshotForInClass(socket!.id, screenshotUrl);
    },
    [socket]
  );

  const onReceiveTabs = React.useCallback(
    (tabs: string[]) => {
      socket?.emit("class-checkin", {
        tabs,
      });
    },
    [socket]
  );

  const {
    startScreenVideo,
    isScreenTracking,
    stopScreenVideo,
    screenPermissionError,
  } = useScreenTracking({
    screenVideoRef,
    screenshotCanvasRef,
    onTakeScreenShot,
    onReceiveTabs,
  });

  const [classOver, setClassOver] = React.useState(false);

  const startInClass = React.useCallback(() => {
    const newSocket = realtimeService.connect();
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to server");
      if (newSocket.connected) {
        newSocket.emit("enter-class", {
          courseId,
          device: "web",
        });
      }

      newSocket.on("class-end", (e) => {
        if (e?.courseId === courseId) {
          setClassOver(true);
        }
      });
    });
  }, [setSocket]);

  React.useEffect(() => {
    return () => {
      stopScreenVideo();
    };
  }, [stopScreenVideo]);

  React.useEffect(() => {
    return () => {
      socket?.close();
    };
  }, [socket]);

  return (
    <div className="container">
      <img src={attendClass} className="page-icon" alt="login icon" />
      {socket ? (
        classOver ? (
          <InClassFinished course={course} />
        ) : (
          <InClassLive course={course} />
        )
      ) : (
        <InClassInstructions
          screenPermissionError={screenPermissionError}
          startScreenVideo={startScreenVideo}
          setAgreedToTerms={setAgreedToTerms}
          startInClass={startInClass}
          agreedToTerms={agreedToTerms}
          isScreenTracking={isScreenTracking}
        />
      )}
      <canvas ref={screenshotCanvasRef} style={{ display: "none" }} />
      <video ref={screenVideoRef} style={{ display: "none" }} />
    </div>
  );
};

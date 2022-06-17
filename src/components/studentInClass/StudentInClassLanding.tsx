import * as React from 'react'
import io, {Socket} from 'socket.io-client';
import {RouteComponentProps} from 'react-router-dom'

import { getStudentCourses, Course } from "../../store/axios";
import { CodeEntry } from '../Resusable/CodeEntry';
import {studentGetCourse} from '../../store/axios';
import { AuthContext } from "../../contexts/AuthContext";
// import {CodeEntry} from './Resusable/CodeEntry';

import { i18n } from 'web-translate';
const attendClass = require('../../Assets/images/attend-class.png');

type StudentInClassLandingProps = RouteComponentProps<{
  courseId: string;
}>

type UseScreenTrackingArgs = {
  screenVideoRef: React.MutableRefObject<HTMLVideoElement | null>;
  screenshotCanvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  onTakeScreenShot(screenshotUrl: string): void;
  onReceiveTabs(tabs: string[]): void;
};

const useScreenTracking = ({ onReceiveTabs, screenVideoRef, screenshotCanvasRef, onTakeScreenShot }: UseScreenTrackingArgs) => {
  const authContext = React.useContext(AuthContext);
  const takeScreenShot = async () => {
    const screenVideo = screenVideoRef.current;
    const screenshotCanvas = screenshotCanvasRef.current;
    console.log({ screenshotCanvas, screenVideo })  
    if (screenshotCanvas && screenVideo) {
      screenshotCanvas.width = screenVideo.videoWidth;
      screenshotCanvas.height = screenVideo.videoHeight;
      const screenshotContext = screenshotCanvas.getContext("2d");

      if (screenshotContext) {
        screenshotContext.drawImage(screenVideo, 0, 0, screenVideo.videoWidth, screenVideo.videoHeight);
      }

      const screenshot = screenshotCanvas.toDataURL("image/jpeg");
      onTakeScreenShot(screenshot);
    }
  }

  const stopScreenVideo = React.useCallback(() => {
    const screenVideo = screenVideoRef.current;
    if (screenVideo) {
      const screenStream: any = screenVideo.srcObject;
      if (!screenStream) return;
      const tracks = screenStream.getTracks();
      tracks.forEach((track: any) => track.stop());  
    }
  }, []);

  const startScreenVideo = React.useCallback(async () => {
    const screenVideo = screenVideoRef.current;
    if (screenVideo) {
      screenVideo.srcObject = await navigator.mediaDevices.getDisplayMedia({
        video: {
          mediaSource: "screen"
        } as any,
      });

      const displaySurface = (screenVideo.srcObject.getVideoTracks()[0].getSettings() as any)
        .displaySurface;
      screenVideo.play();
  
      if (displaySurface !== "monitor") {
        stopScreenVideo();
        await startScreenVideo();
      }
    }
  }, [stopScreenVideo]);

  React.useEffect(() => {
    const minTime = authContext.screenshotInterval ? authContext.screenshotInterval * 1000 : 10 * 1000;

    const screenshotInterval = setInterval(takeScreenShot, minTime);

    window.addEventListener("message", (event) => {
      if (!event.data || !event.data.type || event.data.type !== "TABS_RESPONSE") {
        return;
      }

      if (event.data.tabs && event.data.tabs.length) {
        onReceiveTabs(event.data.tabs)
      }
    });

    startScreenVideo();

    return () => {
      clearInterval(screenshotInterval);
      stopScreenVideo();
    };
  }, [onReceiveTabs]);

  const requestTabs = React.useCallback(() => {
    window.postMessage({ type: "REQUEST_TABS" }, "*");
  }, []);

  return { requestTabs };
};

export const StudentInClassLanding: React.FC<StudentInClassLandingProps> = ({ match }) => {
  const {courseId} = match.params;
  const [course, setCourse] = React.useState<Course | null>(null);
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

  const onTakeScreenShot = React.useCallback((screenshotUrl: string) => {
    socket?.emit('class-checkin', {
      screenshot: screenshotUrl,
    });
  }, [socket]);

  const onReceiveTabs = React.useCallback((tabs: string[]) => {
    socket?.emit('class-checkin', {
      tabs,
    });
  }, [socket]);

  const { requestTabs } = useScreenTracking({
    screenVideoRef,
    screenshotCanvasRef,
    onTakeScreenShot,
    onReceiveTabs,
  });
  
  React.useEffect(() => {
    const newSocket = io(`http://localhost:8080`, {
      withCredentials: true,
    });
    setSocket(newSocket);

    newSocket.emit('enter-class', {
      courseId,
      device: 'web',
    });

    return () => {
      newSocket.close()
    };
  }, [setSocket]);

  return (
    <div className="container">
      <img src={attendClass} className="page-icon" alt="login icon"/>
      <div className="spacer-vertical" />
      <h1>{i18n("Thanks for joining")} {course?.name}</h1>
      <div className="row">
          <div className="col-sm">
            <div onClick={requestTabs}>Request Tabs</div>
          </div>
      </div>
      <canvas ref={screenshotCanvasRef} style={{ display: "none" }} />
      <video ref={screenVideoRef} style={{ display: "none" }} />
  </div>
  )
};

import React from "react";
import { Link } from "react-router-dom";
import {AppConfig} from '../services/appConfig'

import studentDashIcon from "../Assets/images/student-dash-icon.png";
import tickIcon from "../Assets/images/start-class.svg";
import editIcon from "../Assets/images/edit-icon-white.svg";
import gearIcon from "../Assets/images/settings-white.svg";

import { i18n } from "web-translate";
import { paths } from "../paths";
import { useIsFeatureEnabled } from "../hooks";

export const StudentDashboard: React.FC<{}> = () => {
  const isInClassEnabled = useIsFeatureEnabled('in-class');

  return (
    <div className="container prevent-text">
      <img src={studentDashIcon} className="page-icon" alt="login icon" />
      <div className="spacer-vertical" />
      <h1>{i18n("Are you going to a class, or taking a test?")}</h1>
      <form>
        <div className="spacer-vertical" />
        <Link to="/student/class/attend">
          <button className="btn">
            <img src={tickIcon} alt="attend class icon" className="icon-sm" />
            &nbsp;{i18n("Attend class")}
          </button>
        </Link>
        {isInClassEnabled && 
        <>
          <div className="spacer-vertical" />
          <Link to={paths.studentInClassCourseList({})}>
            <button className="btn">
              <img src={tickIcon} alt="attend class icon" className="icon-sm" />
              &nbsp;{i18n("Attend Class")}
            </button>
          </Link>
        </>}
        <div className="spacer-vertical" />
        <Link to="/student/tests">
          <button className="btn">
            <img src={editIcon} alt="take a test icon" className="icon-sm" />
            &nbsp;{i18n("Take a test")}
          </button>
        </Link>

        <div className="spacer-vertical" />
        <Link to="/student/demo/proctor">
          <button className="btn">
            <img src={gearIcon} alt="take a test icon" className="icon-sm" />
            &nbsp;{i18n("Take a demo test")}
          </button>
        </Link>
      </form>
    </div>
  );
};

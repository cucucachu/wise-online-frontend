import React, { Component } from "react";
import { Link } from "react-router-dom";
import { i18n } from "web-translate";
import { paths } from "../../paths";

class NewCourseCard extends Component<{}> {
  render() {
    return (
      <Link className="col-sm-6" to={paths.professorAddCourse({})}>
        <div className="create-course-div shadow">
          <div className="row">
            <div className="create-course">
              <h2 className="center-v-h">{i18n("Create course")}</h2>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default NewCourseCard;

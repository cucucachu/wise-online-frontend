import React, {Component} from 'react';
import setUpIcon from '../Assets/images/setting-icon.png';
import uploadIcon from '../Assets/images/upload-icon.svg';
import downloadIcon from '../Assets/images/download-icon.svg';

import '../Assets/css/radiobtn.css'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link
   } from "react-router-dom";


class SetUpSchoolPage extends Component {

  render(){
      const isFile1Uploaded = true;
      const isFile2Uploaded = false;
      var fileName1 = 'UCSD_roster12'
      var fileUploadLabel = fileName1 + '<img src={setUpIcon} alt="upload icon"/>'

      return(
            <div className="wrap">
                <div className="page-header"></div>
                <div className="container">
                    <img src={setUpIcon} className="page-icon" alt="login icon"/>
                    <div className="spacer-vertical"></div>
                    <h1>Set up your shool</h1>
                    <p className="text-plain">Information must match the provided template </p>
                    <div className="spacer-vertical-s"></div>
                    <div className="container">
                        <div className="row">
                            <form>
                                <div className="col-sm-6">
                                    <div className="shadow">
                                        <label className="radio-container"><h2 style={{paddingTop: "5px"}} className="text-plain">Student roster</h2>
                                        <input type="checkbox"  />
                                        <span className="checkmark"></span>
                                        </label>
                                        {isFile1Uploaded ? <p　style={{paddingLeft: "35px"}}>Uploaded</p> : <p  className="text-plain">Not uploaded</p>}
                                        <button　className="btn-upload">{isFile1Uploaded ? <div><img src={uploadIcon} className="icon-sm" />  {fileName1}</div> : 'Not uploaded'}
                                        </button>
                                        <div className="spacer-vertical-s"></div>
                                        <button　className="btn-download">{isFile1Uploaded ? <div><img src={downloadIcon} className="icon-sm" />  Download template</div> : 'Not uploaded'}
                                        </button>                                    
                                    </div> 
                                </div>
                                <div className="col-sm-6">
                                    <div className="shadow">
                                        <label className="radio-container"><h2 className="text-plain" style={{paddingTop: "5px"}}>Professor roster</h2>
                                        <input type="checkbox"  />
                                        <span className="checkmark"></span>
                                        </label>
                                        {isFile1Uploaded ? <p　style={{paddingLeft: "35px"}}>Uploaded</p> : <p  className="text-plain">Not uploaded</p>}
                                        <button　className="btn-upload">{isFile1Uploaded ? <div><img src={uploadIcon} className="icon-sm" />  {fileName1}</div> : 'Not uploaded'}</button>
                                        <div className="spacer-vertical-s"></div>
                                        <button　className="btn-download">{isFile1Uploaded ? <div><img src={downloadIcon} className="icon-sm" />  Download template</div> : 'Not uploaded'}</button>  
                                    </div>
                                </div>
                                <button className="btn">Next</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
      )
  }
}

export default SetUpSchoolPage;

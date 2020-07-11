import React, { Component } from "react";
import "./styles.css";

class Construction extends Component {
  render() {
    return (
      <div id="construction-container">
        <div className="machine">
          <div className="machine-wrap">
            <div className="machine">
              <div className="machine-roof">
                <div className="machine-silencer">
                  <div className="machine-smoke" />
                </div>
              </div>
              <div className="machine-main">
                <div className="machine-body" />
                <div className="machine-back" />
                <div className="machine-front" />
              </div>
            </div>
            <div className="road">
              <div className="mud-wrap clearfix">
                <div className="mud" />
                <div className="mud" />
                <div className="mud" />
                <div className="mud" />
              </div>
            </div>
          </div>
        </div>
        <div id="explanation">
          <h1>
            Hey, you're at{" "}
            <span id="exp-url">
              gabrielsantos.
              <span id="exp-exten">dev</span>
            </span>
            !
          </h1>
          {/* <h2>Welcome to my site.</h2>
          <h4>
            Unfortunately, I haven't a page finished yet, so... I'll see you
            later, okay?
          </h4> */}
        </div>
      </div>
    );
  }
}

export default Construction;

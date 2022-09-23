import React, { Component } from "react";

type CodeEntryProps = {
  keyCode1: string;
  keyCode2: string;
  keyCode3: string;
  keyCode4: string;
  onChangeKeyCode1(value: string): void;
  onChangeKeyCode2(value: string): void;
  onChangeKeyCode3(value: string): void;
  onChangeKeyCode4(value: string): void;
};

export class CodeEntry extends Component<CodeEntryProps, {}> {
  private textInputRef = React.createRef<HTMLInputElement>();

  handleChangeKeyCode1: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();

    // this.setState({keyCode1: e.target.value})
    this.props.onChangeKeyCode1(e.target.value);

    const index = Array.prototype.indexOf.call(e.target.form, e.target);
    (e.target.form?.elements[index + 1] as any).focus();
  };

  handleChangeKeyCode2: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    // this.setState({keyCode2: e.target.value})
    this.props.onChangeKeyCode2(e.target.value);

    const index = Array.prototype.indexOf.call(e.target.form, e.target);
    (e.target.form?.elements[index + 1] as any).focus();
  };

  handleChangeKeyCode3: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    // this.setState({keyCode3: e.target.value})
    this.props.onChangeKeyCode3(e.target.value);

    const index = Array.prototype.indexOf.call(e.target.form, e.target);
    (e.target.form?.elements[index + 1] as any).focus();
  };

  handleChangeKeyCode4: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    // this.setState({keyCode4: e.target.value})
    this.props.onChangeKeyCode4(e.target.value);

    const index = Array.prototype.indexOf.call(e.target.form, e.target);
    (e.target.form?.elements[index + 1] as any).focus();
  };

  onFocus = (id: string) => {
    // Taken from old code - this seems bad
    const el = document.getElementById(id);
    if (el) {
      el.onpaste = (e) => {
        e.preventDefault();
        return false;
      };
    }
  };

  render() {
    return (
      <div className="container input-wrapper">
        <div className="space-adjust-1">
          <div className="row space-adjust">
            <div className="col">
              <input
                id="code1"
                type="number"
                className="keycode-input"
                value={this.props.keyCode1}
                onFocus={() => this.onFocus("code1")}
                onChange={this.handleChangeKeyCode1.bind(this)}
                maxLength={1}
                ref={this.textInputRef}
                name="code1"
                required
              />
            </div>
            <div className="col">
              <input
                id="code2"
                type="number"
                className="keycode-input"
                value={this.props.keyCode2}
                onFocus={() => this.onFocus("code2")}
                onChange={this.handleChangeKeyCode2.bind(this)}
                maxLength={1}
                name="code2"
                required
              />
            </div>
            <div className="col">
              <input
                id="code3"
                type="number"
                className="keycode-input"
                value={this.props.keyCode3}
                onFocus={() => this.onFocus("code3")}
                onChange={this.handleChangeKeyCode3.bind(this)}
                maxLength={1}
                name="code3"
                required
              />
            </div>
            <div className="col">
              <input
                id="code4"
                type="number"
                className="keycode-input"
                value={this.props.keyCode4}
                onFocus={() => this.onFocus("code4")}
                onChange={this.handleChangeKeyCode4.bind(this)}
                maxLength={1}
                name="code4"
                required
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

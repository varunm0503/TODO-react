import React from "react";

import Title from "./Header/Title";

export default class Header extends React.Component {
  handleChange(e) {
    const newName = e.target.value;
    this.props.changeName(newName);
  }

  render() {
    /*return (
      <div>
        <Title title={this.props.title} />
        <input value={this.props.title} onChange={this.handleChange.bind(this)} />
      </div>
    );*/
      return (
        <div>
          <Title title={this.props.title} />
          <input value={this.props.name} onChange={this.handleChange.bind(this)}/>
        </div>
      );
  }
}

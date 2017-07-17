import React from "react";

import Footer from "./Footer";
import Header from "./Header";

export default class Layout extends React.Component {
  constructor () {
    super();
    this.state = { name : "Will", title: "Title1"};
  }

  changeName (name) {
    this.setState({name:name});
  }

  render(){
    return (
      <div>
        { this.state.name }
        <h1 class = "hello"> Hello World</h1>
        <Header changeName = {this.changeName.bind(this)} 
        title = {this.state.title} name = {this.state.name}/>
        <Footer />
      </div>
    );
  }
}
/*
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>
        <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
        <Footer />
      </div>
    );
  }
}*/

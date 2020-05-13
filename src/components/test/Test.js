import React, { Component } from "react";

class Test extends Component {
  state = {};
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((data) =>
        this.setState({
          title: data.title,
        })
      );
  }
  render() {
    const { title } = this.state;
    return <div>{title}</div>;
  }
}

export default Test;

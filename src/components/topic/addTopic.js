import React, { Component } from "react";

export class AddTopic extends Component {
  state = {
    content: ""
  };
  handleChange = e => {
    this.setState({
      content: e.target.value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.content.length > 0) {
      this.props.addTopic(this.state);
      this.setState({
        content: ""
      });
    }
  };
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
            placeholder="How about the weather?"
          />
          <button>Add Topic</button>
        </form>
      </div>
    );
  }
}
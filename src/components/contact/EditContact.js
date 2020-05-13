import React, { Component } from "react";
import { Consumer } from "../../Context";
import TextInputGroup from "../layout/TextInputGroup";
import axios from "axios";

export default class EditContact extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: "",
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const res = await axios.get(
      `http://jsonplaceholder.typicode.com/users/${id}`
    );

    const contact = res.data;
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // check for error
    if (name === "") {
      this.setState({ error: { name: "Name is Required" } });
      return;
    }
    if (email === "") {
      this.setState({ error: { email: "Email is Required" } });
      return;
    }
    if (phone === "") {
      this.setState({ error: { phone: "Phone is Required" } });
      return;
    }

    const contact = {
      name,
      phone,
      email,
    };

    const { id } = this.props.match.params;

    const res = await axios.put(
      `http://jsonplaceholder.typicode.com/users/${id}`,
      contact
    );

    dispatch({ type: "UPDATE_CONTACT", payload: res.data });

    this.setState({
      name: "",
      email: "",
      phone: "",
      error: "",
    });

    this.props.history.push("/");
  };

  render() {
    const { name, email, phone, error } = this.state;

    return (
      <Consumer>
        {(value) => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <h6 className="card-header">Edit Contact</h6>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={error.name}
                  />
                  <TextInputGroup
                    label="Email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    type="email"
                    error={error.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone"
                    value={phone}
                    onChange={this.onChange}
                    error={error.phone}
                  />
                  <button type="submit" className="btn btn-light btn-block">
                    Update Contact
                  </button>
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

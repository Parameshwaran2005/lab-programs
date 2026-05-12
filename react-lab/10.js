import React, { Component } from "react";

class App extends Component {

  state = {
    users: [],
    text: ""
  };

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => this.setState({ users: data }));
  }

  render() {
    return (
      <div>

        <input
          placeholder="Search"
          onChange={(e) =>
            this.setState({ text: e.target.value })
          }
        />

        <table border="1">

          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
          </tr>

          {this.state.users
            .filter(user =>
              user.name.toLowerCase().includes(
                this.state.text.toLowerCase()
              )
            )
            .map(user => (

              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address.city}</td>
              </tr>

          ))}

        </table>

      </div>
    );
  }
}

export default App;
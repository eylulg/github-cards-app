//import './App.css';
import React from "react";

//GitHub usernames: gaearon, sophiebits, sebmarkbage, bvaughn

class Card extends React.Component {
  render() {
    const profile = this.props;
    return (
      <div style={{ margin: "1rem" }}>
        <img style={{ width: "75px" }} src={profile.avatar_url} alt="" />
        <div style={{ display: "inline-block", marginLeft: "12px" }}>
          <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>
            {profile.name}
          </div>
          <div className="company">{profile.company}</div>
        </div>
      </div>
    );
  }
}

const CardList = (props) => (
  <div>
    {props.profiles.map((profile) => (
      <Card key={profile.id} {...profile} />
    ))}
  </div>
);

class Form extends React.Component {
  state = { userName: "" };
  handleSubmit = async (event) => {
    event.preventDefault();
    const resp = await fetch(
      `https://api.github.com/users/${this.state.userName}`
    );
    const data = await resp.json();
    this.props.onSubmit(data);
    this.setState({ userName: "" });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="GitHub username"
          required
        />
        <button>Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  state = {
    profiles: [],
  };
  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData],
    }));
  };
  render() {
    return (
      <div className="App">
        <div className="App-header">{this.props.title}</div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;

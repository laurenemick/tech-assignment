import React, { Component } from "react";
import { render } from "react-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("api/companies")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          console.log(data)
          return {
            data,
            loaded: true
          };
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <ul>
        <h1>Hello!</h1>
        {this.state.data.map(company => {
          return (
            <div key={company.company}>
              {company.company}
            </div>
          );
        })}
      </ul>
    );
  }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);
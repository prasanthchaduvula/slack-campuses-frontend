import React from 'react';

class Test extends React.Component {
  // create campus
  createCampus = () => {
    fetch('/api/v1/campus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.fomotoken
      },
      body: JSON.stringify({
        name: 'mint'.toLowerCase()
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  // get  campuses
  allCampuses = () => {
    fetch('/api/v1/campus')
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  // create channel
  createChannel = () => {
    fetch(`/api/v1/channels/${'hint'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.fomotoken
      },
      body: JSON.stringify({
        name: '#section'.toLowerCase()
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  // join campus
  joinCampus = () => {
    fetch(`/api/v1/campus/${'5ea3c86a5fa21c02a5b5a687'}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.fomotoken
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  render() {
    return (
      <div>
        <p>logged</p>
        <button onClick={this.createCampus}>create campus</button>
      </div>
    );
  }
}

export default Test;

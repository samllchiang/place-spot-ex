const React = require('react');
const ReactDOM = require('react-dom');
const request = require('superagent');

class PlaceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { places: [] };
  }

  update() {
    const self = this;
    const { host, port } = window.location;
    const url = `http://${host}/api/history`
    request
      .get(url)
      .end(function (error, response) {
        let result = JSON.parse(response.text)
        console.log(result)
        self.setState({
          places: result,
        })
      })
  }

  componentDidMount() {
    this.update()
  }

  render() {
    return (
      <div id="resultList" className="ui relaxed divided list">
        {this.state.places.map(function (item, index) {
          return <PlaceItem key={index} place={item.place} address={item.result.formatted_address} />
        })}
      </div>
    )
  }
}

class PlaceItem extends React.Component {
  render() {
    return (
      <div className="item">
        <i className="large map signs middle aligned icon"></i>
        <div className="content">
          <a className="header">{this.props.place}</a>
          <div className="description">{this.props.address}</div>
        </div>
      </div>
    )
  }
}

class Title extends React.Component {
  render() {
    return (
      <h2 className="ui teal image header">
        <i className="hand spock icon"></i>
        <div className="content">
          {this.props.text}
        </div>
      </h2>
    )
  }
}

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchPlace: ''
    }

    // This binding is necessary to make `this` work in the callback
    this.send = this.send.bind(this)
    this.placeList = undefined
  }

  handleChange(e) {
    this.setState({ searchPlace: e.target.value });
  }

  send() {
    const self = this;
    const { searchPlace } = this.state;
    const { host, port } = window.location;
    const url = `http://${host}/api/search-place`
    request
      .get(url)
      .query({ place: searchPlace })
      .end(function (error, response, body) {
        let result = JSON.parse(response.text)
        self.placeList.update()
        console.log(result)
      })
  }

  render() {
    return (
      <div className="ui middle aligned center aligned grid">
        <div className="fourteen wide column">
          <Title text="Search the place" />
          <div className="ui action input">
            <input type="text" placeholder="Search..." value={this.state.searchPlace}
              onChange={this.handleChange.bind(this)}
            />
            <button className="ui blue button" onClick={this.send}>Search</button>
          </div>
          <div className="ui horizontal divider">
            place-spot
          </div>
          <PlaceList ref={(placeList) => { this.placeList = placeList }} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
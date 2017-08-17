const React = require('react');
const ReactDOM = require('react-dom');

class PlaceItem extends React.Component {
	render() {
		return (
		<div className="item">
          <i className="large youtube middle aligned icon"></i>
          <div className="content">
            <a className="header">{this.props.place}</a>
          </div>
        </div>
		)
	}
} 

class App extends React.Component {
  render() {
    return (
      <div className="ui middle aligned center aligned grid">
    <div className="fourteen wide column">
      <h2 className="ui teal image header">
        <i className="hand spock icon"></i>
        <div className="content">
          Search the place
        </div>
      </h2>
      <div className="ui action input">
        <input id="urlText" type="text" placeholder="Search..."/>
        <button id="searchButton" className="ui blue button">Search</button>
      </div>
      <div className="ui horizontal divider">
        place-spot
      </div>
      <div id="resultList" className="ui relaxed divided list">
			< PlaceItem place="Taipei 101"  />
			< PlaceItem place="台大夜市"  />
			< PlaceItem place="ntu"  />
      </div>
    </div>
  </div>
    )
  }
}

/*
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
*/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
import React, { Component } from 'react';
import './app.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class App extends Component {

  state = {
    list: [],
    pagination: {
      perPage: 3,
      page: 0,
    }
  };

  componentDidMount() {
    this.makeHttpRequest();
  }

  makeHttpRequest = async() => {
    let res = await axios.get('http://localhost:8080/list').catch(err => console.log(err));

    this.setState({
      list: [...res.data.list]
    });
  };

  render() {
    let weathers = this.state.list.map(item => {
      const { id, name, main } = item;
      const { temp, humidity, pressure } = main;
      const { speed } = item.wind;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{temp}</td>
          <td>{humidity}</td>
          <td>{pressure}</td>
          <td>{speed}</td>
        </tr>
      )
    }) || '';

    return (
      <div>
        <table className='Table'>
          <thead>
          <tr>
            <th>Name of the city</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Pressure</th>
            <th>Wind Speed</th>
          </tr>
          </thead>
          <tbody>
          {weathers}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default App;

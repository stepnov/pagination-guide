import React, { Component } from 'react';
import './app.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

class App extends Component {

  state = {
    list: [],
    perPage: 3,
    page: 0,
    pages: 0,
  };

  componentDidMount() {
    this.makeHttpRequest();
  }

  makeHttpRequest = async() => {
    let res = await axios.get('http://localhost:8080/list').catch(err => console.log(err));

    const {perPage} = this.state;
    const {list} = res.data;
    this.setState({
      list,
      pages: Math.floor(list.length / perPage)
    });
  };

  handlePageClick = (event) => {
    let page = event.selected;
    this.setState({page})
  }

  render() {
    const {page, perPage, pages, list} = this.state;
    let items = list.slice(page * perPage, (page + 1) * perPage);
    let weathers = items.map(item => {
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
      <>
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
          previousLabel={'prev'}
          nextLabel={'next'}
          pageCount={pages}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          activeClassName={'active'}
        />
      </>
    );
  }
}

export default App;

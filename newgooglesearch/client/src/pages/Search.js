import React, { Component } from "react";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Form from "../components/Form";
import SearchResult from "../components/SearchResults";

class Search extends Component {
  state = {
    books: [],
    search: "",
    error: "",
    message: ""
  };

  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "", synopsis: "" })
      )
      .catch(err => console.log(err));
  };



  handleInputChange = event => {
    this.setState({
      search: event.target.value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

      API.googleSearch(this.state.search)
        .then(res => {
         if (res.data.items === "error"){
          throw new Error(res.data.items);
        }
      else{
        let results = res.data.items

        results = results.map(result => {
          result = {
            key:result.id,
            id:result.id,
            title:result.volumeInfo.title,
            author:result.volumeInfo.authors,
            description:result.VolumeInfo.description,
            image:result.VolumeInfo.imageLinks.thumbnail,
            link:result.VolumeInfo.infoLink
          }
          return result;
        })
        this.setState({books:results, error: ""})

  }
})
  .catch(err => this.setState({error:err.items}))
} 

handleSavedBooks = event =>{
  event.preventDefault();
  console.log(this.state.books)

  let savedBooks = this.state.books.filter(book => book.id === event.target.id)
  savedBooks = savedBooks[0];
  API.saveBook(savedBooks)
  .then(this.setState({ message: alert("You saved the book: " + savedBooks)}))
  .catch (err => console.log(err))
}


  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search for your favorite books through the Google Api!</h1>
            </Jumbotron>
      
              <Form
               handleFormSubmit={this.handleFormSubmit}
                handleInputChange ={this.handleInputChange}
              />
          </Col>
        <Container>
          <SearchResult 
          books ={this.state.books} 
          handleSavedBooks = {this.handleSavedBooks}
          />
        </Container>
        </Row>
      </Container>
              /* <SaveBtn
               disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
               Save Book
              </SaveBtn>

            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book._id}>
                    <Link to={"/saved/" + book._id}>
                      <strong>
                        {book.title} by {book.author}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col> */
      
    );
  }
}

export default Search;

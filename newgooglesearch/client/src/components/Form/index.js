import React from "react";

// This file exports the Input, TextArea, and FormBtn components

const Form = props => {

  return (
    <form>
    <div className="form-group">
   <input className="col-12 form-control"
          value={props.search}
          type="text"
          name="searchBook"
          placeholder="Enter Book's Name"
          onChange={props.handleInputChange}
    />
    </div>


    <button type="submit" 
        className="submitBtn btn btn-primary" 
        onClick={props.handleFormSubmit}>
                Submit
   </button>
   </form>
  )
}
export default Form;

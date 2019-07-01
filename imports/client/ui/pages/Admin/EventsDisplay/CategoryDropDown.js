import React, { Component } from 'react';

class CategoryDropDown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.change = this.change.bind(this);
  }

  componentDidUpdate(prevProps,prevState){
    if (prevState.value !== this.state.value){
      this.props.changeCategory(this.state.value);
    }
  }

  change(event) {
    const setValue = {
      value: event.target.value,
    }
    this.setState(setValue);
  }

  render() {
    const { allPosibleCategories, currentCategory} = this.props;
    const categoriesForDropDown = [<option key={"Sort By Category"} disabled>Sort By Category</option>];
    allPosibleCategories.forEach(ele=>{
      categoriesForDropDown.push(<option key={ele} value={ele}>{ele}</option>);
    })

    return (
      <select id="category-select" value={currentCategory} onChange={this.change}>
        {categoriesForDropDown}
      </select>
    )
  }
}

export default CategoryDropDown;

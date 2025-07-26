import React from 'react';
import Select from 'react-select';
import { FormGroup, Label, Input } from 'reactstrap';

const flattenCategories = (groups) => {
  return groups.flatMap(group =>
    group.categories.map(category => ({
      name: category.name,
      value: category.name,
      group: group.name,
      color: category.color,
      url: category.url,
    }))
  );
};

const SearchableCategoryInput = ({ groupedCategories, handleInputChange }) => {
  const options = flattenCategories(groupedCategories);

  return (
    <>
      <Label for="categories">Categories</Label>


      <Select
        inputId="categories"
        name="categories"
        id="categories"
        className="categories-select"
        options={options}
        maxMenuHeight={205}
        menuPlacement="auto"
        formatOptionLabel={(e) => {
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span
                style={{
                  backgroundColor: e.color,
                  borderRadius: '50%',
                  width: 10,
                  height: 10,
                  display: 'inline-block',
                  marginRight: 8
                }}>
              </span>
              {e.name}
            </div>
          )
        }}
        onChange={handleInputChange}
        placeholder="Search or select a category..."
        isClearable
      />
    </>
  );
};

export default SearchableCategoryInput;

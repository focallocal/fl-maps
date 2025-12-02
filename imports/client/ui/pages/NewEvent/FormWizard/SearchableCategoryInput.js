import React from 'react';
import Select from 'react-select';
import { Label } from 'reactstrap';

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

const SearchableCategoryInput = ({ groupedCategories, handleInputChange, value }) => {
  const options = flattenCategories(groupedCategories);

  const resolveSelectedOption = () => {
    if (!value) {
      return null
    }

    const categoryName = Array.isArray(value)
      ? (value[0]?.name || value[0])
      : (typeof value === 'string' ? value : value?.name)

    if (!categoryName) {
      return null
    }

    return options.find(option => option.name === categoryName) || null
  }

  const selectedOption = resolveSelectedOption()

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
        value={selectedOption}
      />
    </>
  );
};

export default SearchableCategoryInput;

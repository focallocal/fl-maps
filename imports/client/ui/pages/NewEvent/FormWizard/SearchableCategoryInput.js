import React, { useState, useRef } from 'react';
import { Label, Collapse, Input, ListGroup, ListGroupItem } from 'reactstrap';
import i18n from '/imports/both/i18n/en';

const categoryLabels = i18n.NewEventModal.categoryPicker

// Categories to hide from Form 1
const HIDDEN_CATEGORIES = [
  'Positive People Nearby',
  'Random Acts of Kindness Communities'
];

const SearchableCategoryInput = ({ groupedCategories, handleInputChange, value, showSearch = false }) => {
  const [openGroups, setOpenGroups] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef(null);

  // Filter out hidden categories from each group
  const filteredGroups = groupedCategories
    .map(group => ({
      ...group,
      categories: group.categories.filter(
        cat => !HIDDEN_CATEGORIES.includes(cat.name)
      )
    }))
    .filter(group => group.categories.length > 0); // Remove empty groups

  const toggleGroup = (groupName) => {
    setOpenGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const resolveSelectedName = () => {
    if (!value) return null;
    if (Array.isArray(value)) {
      return value[0]?.name || value[0] || null;
    }
    return typeof value === 'string' ? value : value?.name || null;
  };

  const selectedName = resolveSelectedName();

  const handleCategoryClick = (category) => {
    // Mimic react-select's onChange format
    handleInputChange({
      name: category.name,
      value: category.name,
      color: category.color,
      url: category.url
    });
    setSearchTerm(''); // Clear search after selection
  };

  // Search functionality - expand all groups and scroll to match
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(e.target.value);
    
    if (term.length > 0) {
      // Expand all groups when searching
      const allOpen = {};
      filteredGroups.forEach(group => {
        allOpen[group.name] = true;
      });
      setOpenGroups(allOpen);
      
      // Find first matching category and scroll to it
      setTimeout(() => {
        const matchingElement = containerRef.current?.querySelector(
          `[data-category-name*="${term}"]`
        );
        if (matchingElement) {
          matchingElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  };

  // Check if category matches search term
  const matchesSearch = (categoryName) => {
    if (!searchTerm) return true;
    return categoryName.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <div className="category-accordion">
      <Label for="categories">{i18n.NewEventModal.categories}</Label>
      
      {selectedName && (
        <div className="selected-category">
          <span className="selected-label">{categoryLabels.selected}</span>
          <span className="selected-name">{selectedName}</span>
          <button
            type="button"
            className="clear-btn"
            onClick={() => handleInputChange(null)}
            aria-label="Clear selection"
          >
            ×
          </button>
        </div>
      )}

      <div className="category-modal-container" ref={containerRef}>
        {showSearch && (
          <div className="category-search">
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        )}
        <ListGroup className="category-list">
          {filteredGroups.map((group) => (
            <React.Fragment key={group.name}>
              <ListGroupItem
                className="category-parent"
                onClick={() => toggleGroup(group.name)}
              >
                <span style={{ color: group.color }}>{group.name}</span>
                <span className={`chevron ${openGroups[group.name] ? 'open' : ''}`}>▶</span>
              </ListGroupItem>
              <Collapse isOpen={openGroups[group.name]}>
                {group.categories.map((category) => (
                  <ListGroupItem
                    key={category.name}
                    className={`category-child ${selectedName === category.name ? 'selected' : ''} ${!matchesSearch(category.name) ? 'search-hidden' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                    data-category-name={category.name.toLowerCase()}
                    style={{ color: category.color }}
                  >
                    {category.name}
                    {category.url && (
                      <a 
                        href={category.url} 
                        target='_blank' 
                        rel="external noreferrer" 
                        aria-label='Go to Page'
                        onClick={(e) => e.stopPropagation()}
                      >
                        ?
                      </a>
                    )}
                  </ListGroupItem>
                ))}
              </Collapse>
            </React.Fragment>
          ))}
        </ListGroup>
      </div>
    </div>
  );
};

export default SearchableCategoryInput;

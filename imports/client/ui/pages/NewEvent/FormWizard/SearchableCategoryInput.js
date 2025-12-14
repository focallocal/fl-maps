import React, { useState } from 'react';
import { Label, Collapse } from 'reactstrap';
import i18n from '/imports/both/i18n/en';

const categoryLabels = i18n.NewEventModal.categoryPicker

// Categories to hide from Form 1
const HIDDEN_CATEGORIES = [
  'Positive People Nearby',
  'Random Acts of Kindness Communities'
];

const SearchableCategoryInput = ({ groupedCategories, handleInputChange, value }) => {
  const [openGroups, setOpenGroups] = useState({});

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

      <div className="accordion-groups">
        {filteredGroups.map((group) => (
          <div key={group.name} className="accordion-group">
            <div
              className="accordion-header"
              onClick={() => toggleGroup(group.name)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleGroup(group.name)}
            >
              <span className="group-name">{group.name}</span>
              <span className={`chevron ${openGroups[group.name] ? 'open' : ''}`}>▶</span>
            </div>
            <Collapse isOpen={openGroups[group.name]}>
              <div className="accordion-content">
                {group.categories.map((category) => (
                  <div
                    key={category.name}
                    className={`category-item ${selectedName === category.name ? 'selected' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(category)}
                  >
                    <span
                      className="color-dot"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="category-name">{category.name}</span>
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchableCategoryInput;

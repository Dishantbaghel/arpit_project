import { useState } from 'react';

const AutocompleteWithBadge = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const options = ['Apple', 'Banana', 'Cherry', 'Grapes', 'Mango'];

  const handleSelectOption = (option) => {
    if (!selectedOptions.includes(option)) {
      setSelectedOptions([...selectedOptions, option]);
    }
    setInputValue(''); // Clear input after selection
  };

  const handleRemoveOption = (option) => {
    setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Autocomplete Input with Badges */}
      <div className="flex items-center flex-wrap border border-gray-300 rounded-lg px-2 py-1 focus-within:ring-2 focus-within:ring-blue-500">
        {selectedOptions.map((option, index) => (
          <span
            key={index}
            className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center gap-1 mr-2 mb-2"
          >
            {option}
            <button
              type="button"
              className="ml-2 text-white hover:text-red-400"
              onClick={() => handleRemoveOption(option)}
            >
              &times;
            </button>
          </span>
        ))}

        {/* The input field for typing */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search and select options"
          className="flex-grow px-2 py-1 focus:outline-none"
        />
      </div>

      {/* Autocomplete Dropdown */}
      {inputValue && (
        <div className="mt-2 border border-gray-300 rounded-lg shadow-lg">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelectOption(option)}
              >
                {option}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No options found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default AutocompleteWithBadge;

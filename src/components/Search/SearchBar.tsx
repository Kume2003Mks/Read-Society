import React, { useState } from 'react';
import Styles from './Searchbar.module.css';
import { Icon } from '@iconify/react';

interface SearchBarProps {
  onSearchChange: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearchChange(newSearchTerm); // Trigger the callback with the new search term
  };

  return (
    <div className={Styles.search_bar}>
      <input
        type="search"
        placeholder="Search"
        className={Styles.search_input}
        value={searchTerm}
        onChange={handleSearch}
      />
      <Icon icon="mingcute:search-2-fill" className={Styles.search_icon} />
    </div>
  );
};

export default SearchBar;

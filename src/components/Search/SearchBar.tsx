import React, { useState } from 'react';
import Styles from './Searchbar.module.css'
import { Icon } from '@iconify/react';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
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

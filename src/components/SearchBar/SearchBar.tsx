import { FormEvent, useState } from 'react';
import customToast from '../ErrorMessage/Toast/ToastMessage';
import s from './SearchBar.module.css';

interface SearchBarPrors {
  onSubmit: (query: string) => void;
}

const SearchBar = ({ onSubmit }:SearchBarPrors) => {
  const [query, setQuery] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (query.trim() === '') {
      customToast('warn', 'Oops... Enter something');
      return;
    }

    onSubmit(query);
    setQuery('');
  };
  return (
    <header className={s.header}>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <input
          type="text"
          name="query"
          className={s.searchInput}
          placeholder="Search images and photos"
          value={query}
          onChange={e => setQuery(e.target.value.toLowerCase())}
        />
        <button type="submit" className={s.searchBtn}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
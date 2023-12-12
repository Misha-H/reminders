import { useContext } from 'react';

import { Search } from '~/assets/icons';
import { DataContext } from '~/context';

import type { SyntheticEvent } from 'react';

// TODO: Display all tasks (and subtasks) in a nice fashion - refer to Figma
export default function () {
  const data = useContext(DataContext);

  // TODO: correct types
  // TODO: add function description
  const handleSearch = (event: SyntheticEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    console.log();
    const search = value.slice();
    data.filter(search);
  };

  return (
    <div className='searchbar'>
      <div className='icon'>
        <Search />
      </div>
      <div className='form-floating'>
        <input
          id='searchbar'
          placeholder='searchbar'
          type='search'
          className='form-control'
          onInput={handleSearch}
        />
        <label htmlFor='searchbar' className='f'>
          Search
        </label>
      </div>
    </div>
  );
}

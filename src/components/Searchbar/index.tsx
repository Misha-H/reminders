import { Search } from '~/assets/icons';
import  { FormField } from '~/components';

import type { SyntheticEvent } from 'react';
import type { FormFieldType } from '~/components';

// TODO: Display all tasks (and subtasks) in a nice fashion - refer to Figma
export default function () {
  const searchField: FormFieldType = {
    id: 'searchbar',
    label: 'Search',
    type: 'search'
  }

  // TODO: add function description
  const handleSearch = (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = event.target as HTMLInputElement;
    const search = value.slice();
  };

  return (
    <div className='searchbar'>
      <div className='icon'>
        <Search />
      </div>
      <div className='form-floating'>
        <FormField {...searchField} onInput={handleSearch}  />
        <label htmlFor={searchField.id}>{searchField.label}</label>
      </div>
    </div>
  );
}

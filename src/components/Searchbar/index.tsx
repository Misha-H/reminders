import { Search } from '~/assets/icons';
import  { FormField } from '~/components';

import type { SyntheticEvent } from 'react';
import type { FormFieldType } from '~/components';

export default function () {
  const searchField: FormFieldType = {
    id: 'searchbar',
    label: 'Search',
    type: 'search'
  }

  // TODO: add function description
  // TODO: this does not search anything currently
  const handleSearch = (event: SyntheticEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const search = value.slice();
  };

  return (
    <div className='searchbar'>
      <div className='icon'>
        <Search />
      </div>
      <div className='form-floating'>
        <FormField {...searchField} onInput={handleSearch} />
        <label htmlFor={searchField.id}>{searchField.label}</label>
      </div>
    </div>
  );
}

import { Search } from '~/assets/icons';
import { FormField } from '~/components';

import type { FormFieldType } from '~/components';

export interface SearchbarProps {
  handleSearch: FormFieldType['handler'];
}

export default function (props: SearchbarProps) {
  const { handleSearch } = props;
  const searchField: FormFieldType = {
    id: 'searchbar',
    label: 'Search',
    type: 'search',
  };

  return (
    <div className='searchbar'>
      <div className='icon'>
        <Search />
      </div>
      <div className='form-floating'>
        <FormField {...searchField} handler={handleSearch} />
        <label htmlFor={searchField.id}>{searchField.label}</label>
      </div>
    </div>
  );
}

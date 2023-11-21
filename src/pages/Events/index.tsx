import { Header, Card, FormField } from '~/components';

import type {FormFieldType} from '~/components';

export default function () {
  const fields: Array<FormFieldType> = [
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description', type: 'textarea' },
    { id: 'background-colour', label: 'Background Colour', type: 'color' },
    { id: 'mark-weight', label: 'Mark Weight', type: 'number' },
    { id: 'date', label: 'Date', type: 'date' },
  ];

  return (
    <div className='events page'>
      <Header title='Add Reminder' />

      {fields.map((field) => (
        <Card key={field.label}>
          <div className='form-floating'>
            <FormField
              id={field.id}
              label={field.label}
              type={field.type}
              placeholder={field.label}
            />
            <label htmlFor={field.id}>{field.label}</label>
          </div>
        </Card>
      ))}

      <div className='actions'>
        <button className='bg-red'>Exit</button>
        <button className='bg-green'>Confirm</button>
      </div>
    </div>
  );
}

/* Add reminder (centered)

Title: ________                     input[text]
Description: ________               textarea

Background colour: #___ or red      input[color]
Mark Weight (_% weight)             input[number|text]
Date dd/mm/yy                       input[date]

EXIT | CONFIRM
*/

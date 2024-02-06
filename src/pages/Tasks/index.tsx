import { Card, FormField, Header } from '~/components';

import type { FormFieldType } from '~/components';

import type { FormEvent } from 'react';

export default function () {
  const fields: Array<FormFieldType> = [
    { id: 'title', label: 'Title' },
    { id: 'description', label: 'Description', type: 'textarea' },
    { id: 'background-colour', label: 'Background Colour', type: 'color' },
    { id: 'mark-weight', label: 'Mark Weight', type: 'number' },
    { id: 'date', label: 'Date', type: 'date' },
  ];

  const handleConfirm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    for (const [key, value] of formData) {
      console.log(key, value);
    }
  };

  return (
    <div className='tasks page'>
      <Header title='Add Task' />

      <form onSubmit={handleConfirm}>
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
          <button className='bg-green' type='submit'>
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
}

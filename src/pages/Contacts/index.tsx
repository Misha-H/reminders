import { Accordion, FormField, Header } from '~/components';

import type { FormFieldType } from '~/components';

interface Contact {
  name: string;
  description: string;
  phone: string;
}

const contacts: Array<Contact> = [
  { name: 'Random Name0', description: 'Description0', phone: '0400 000 000' },
  { name: 'Random Name1', description: 'Description1', phone: '0400 111 111' },
  { name: 'Random Name2', description: 'Description2', phone: '0400 222 222' },
  { name: 'Random Name3', description: 'Description3', phone: '0400 333 333' },
  { name: 'Random Name4', description: 'Description4', phone: '0400 444 444' },
  { name: 'Random Name5', description: 'Description5', phone: '0400 555 555' },
];

const newContactFields: Array<FormFieldType> = [
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description', type: 'textarea' },
  { id: 'phone', label: 'Phone Number', type: 'tel' },
];

export default function () {
  return (
    <div className='contacts page'>
      <Header title='Contacts' />

      <Accordion
        content={[
          <div>
            <form action=''>
              {newContactFields.map((field) => (
                <div key={field.id} className='form-floating'>
                  <FormField
                    id={field.id}
                    label={field.label}
                    type={field.type}
                    placeholder={field.label}
                  />
                  <label htmlFor={field.id}>{field.label}</label>
                </div>
              ))}

              <input type='submit' value='Submit' />
            </form>
          </div>,
        ]}
      >
        <div className='container'>
          <span className='description'>Create New Contact</span>
        </div>
      </Accordion>

      {contacts.map((contact) => (
        <Accordion
          key={contact.name}
          content={[
            <div>
              <p className='description'>{contact.phone}</p>
              <p className='description'>{contact.description}</p>
            </div>,
          ]}
        >
          <div className='container'>
            <span className='description'>{contact.name}</span>
          </div>
        </Accordion>
      ))}
    </div>
  );
}

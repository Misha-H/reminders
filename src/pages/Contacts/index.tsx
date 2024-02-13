import { useEffect, useState } from 'react';

import { Accordion, FormField, Header } from '~/components';
import { Db } from '~/db/utils/Db';

import type { FormEvent } from 'react';

import type { FormFieldType } from '~/components';
import type { NewContact } from '~/db/schema/contacts';

interface Contact {
  name: string;
  description: string;
  phone: string;
}

// TODO: Remove when done with test data
const contacts: Array<Contact> = [
  { name: 'Random Name0', description: 'Description0', phone: '0400 000 000' },
  { name: 'Random Name1', description: 'Description1', phone: '0400 111 111' },
  { name: 'Random Name2', description: 'Description2', phone: '0400 222 222' },
  { name: 'Random Name3', description: 'Description3', phone: '0400 333 333' },
  { name: 'Random Name4', description: 'Description4', phone: '0400 444 444' },
  { name: 'Random Name5', description: 'Description5', phone: '0400 555 555' },
];

export default function () {
  const [lastPhoneNumber, setLastPhoneNumber] = useState<string>();
  const [data, setData] = useState<
    Awaited<ReturnType<(typeof Db)['getContacts']>>
  >([]);
  const newContactFields: Array<FormFieldType> = [
    { id: 'name', label: 'Name', required: true },
    { id: 'phone', label: 'Phone Number', type: 'tel', required: true },
    { id: 'description', label: 'Description', type: 'textarea' },
  ];

  const handleConfirm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newContact = Object.fromEntries(
      formData.entries()
    ) as unknown as NewContact;

    // Check if phone number exists
    const doesContactPhoneExist = await Db.doesContactPhoneExist(
      newContact.phone
    );

    // TODO: doesContactPhoneExist = false
    // - Create new contact
    // TODO: doesContactPhoneExist = true
    // - Disbale the submit button, to show and stop user from repeating request
    // - Display a message to the user with the phone number they inserted which is already used, and provide feedback on what to do next (change to use a different phone number)

    await Db.createContact(newContact);
  };

  useEffect(() => {
    Db.getContacts().then(setData);
  }, []);

  return (
    <div className='contacts page'>
      <Header title='Contacts' />

      <Accordion
        isForm
        content={[
          <div>
            <form onSubmit={handleConfirm}>
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

              <div className='actions'>
                <button className='bg-red' type='button'>
                  Exit
                </button>
                <button className='bg-green' type='submit'>
                  Confirm
                </button>
              </div>
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

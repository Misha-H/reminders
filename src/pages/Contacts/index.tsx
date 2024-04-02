import { useEffect, useState } from 'react';

import { Accordion, FormField, Header } from '~/components';
import { Db } from '~/db/utils/Db';

import type { FormEvent } from 'react';

import type { FormFieldType } from '~/components';
import type { NewContact } from '~/db/schema/contacts';

export default function () {
  const [lastPhoneNumber, setLastPhoneNumber] = useState<string>('');
  const [doShowPhoneFeedback, setDoShowPhoneFeedback] =
    useState<boolean>(false);
  const [data, setData] = useState<
    Awaited<ReturnType<(typeof Db)['getContacts']>>
  >([]);
  const newContactFields: Array<FormFieldType> = [
    { id: 'name', label: 'Name', required: true },
    { id: 'phone', label: 'Phone Number', type: 'tel', required: true, maxLength: 10 },
    { id: 'description', label: 'Description', type: 'textarea' },
  ];

  const getContacts = () => {
    Db.getContacts().then(setData);
  }

  const handleConfirm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Get the keys and values from the form data
    const formData = new FormData(event.currentTarget);
    const newContact = Object.fromEntries(
      formData.entries()
    ) as unknown as NewContact;

    // Check if phone number exists
    const doesContactPhoneExist = await Db.doesContactPhoneExist(
      newContact.phone
    );

    // Create contact if contact is unique, otherwise display non-unique phone number message
    if (!doesContactPhoneExist) {
      await Db.createContact(newContact);
      // Update the contacts list, after the new contact has been created
      getContacts();
    } else {
      // Store attempted phone number, to display in feedback message
      setLastPhoneNumber(newContact.phone);
      // Show user the phone number feedback message
      setDoShowPhoneFeedback(true);
      // Hide the phone number feedback message from the user after a delay
      setTimeout(() => setDoShowPhoneFeedback(false), 10000);
    }
  };

  // Get the contacts when the page is rendered into view
  useEffect(getContacts, []);

  return (
    <div className='contacts page'>
      {doShowPhoneFeedback ? (
        <div className='floating-feedback'>
          <div>
            <span>
              Phone number {lastPhoneNumber ?? '<unknown_phonenumber>'} already exists. Please try another phone number.
            </span>
          </div>
        </div>
      ) : (
        <></>
      )}

      <Header title='Contacts' />

      <Accordion
        isColoured
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
                    maxLength={field.maxLength}
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

      {data.map((contact) => (
        <Accordion
          key={contact.id}
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

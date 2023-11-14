import { Header, Card } from '../../components';

export default function () {
  const fields = [
    { id: 'title', label: 'Title', type: 'text' },
    { id: 'description', label: 'Description', type: 'textarea' },
    { id: 'background-colour', label: 'Background Colour', type: 'color' },
    { id: 'mark-weight', label: 'Mark Weight', type: 'number' },
    { id: 'date', label: 'Date', type: 'date' },
  ];

  return (
    <div className='events-page'>
      <Header title='Add Reminder' />

      {fields.map((field) => (
        <Card key={field.label}>
          <div className='form-floating'>
            {field.type === 'textarea' ? (
              <textarea
                id={field.id}
                className='form-control'
                placeholder={field.label}
              ></textarea>
            ) : (
              <input
                id={field.id}
                type={field.type}
                className='form-control'
                placeholder={field.label}
              />
            )}
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

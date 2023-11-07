import { Header, Card } from '../../components';

export default function () {
  const fields = [
    { title: 'Title', type: 'text' },
    { title: 'Description', type: 'textarea' },
    { title: 'Background Colour', type: 'color' },
    { title: 'Mark Weight', type: 'number' },
    { title: 'Date', type: 'date' },
  ];

  return (
    <>
      <Header title='Add Reminder' />

      {fields.map((field) => (
        <Card key={field.title}>
          <div className='form-floating'>
            {field.type === 'textarea' ? (
              <textarea
                id={field.title}
                className='form-control'
                placeholder={field.title}
              ></textarea>
            ) : (
              <input
                id={field.title}
                type={field.type}
                className='form-control'
                placeholder={field.title}
              />
            )}
            <label htmlFor={field.title}>{field.title}</label>
          </div>
        </Card>
      ))}

      <div>
        <button>Exit</button>
        <button>Confirm</button>
      </div>
    </>
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

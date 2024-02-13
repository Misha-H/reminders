import { useEffect, useState } from 'react';

import { Accordion, FormField, Header, Searchbar, Task } from '~/components';
import { Db } from '~/db/utils/Db';

import type { FormFieldType } from '~/components';

import type { FormEvent } from 'react';
import type { NewTask } from '~/db/schema/tasks';

export default function () {
  const [data, setData] = useState<
    Awaited<ReturnType<(typeof Db)['getTasks']>>
  >([]);
  const newTaskFields: Array<FormFieldType> = [
    { id: 'title', label: 'Title', required: true },
    { id: 'description', label: 'Description', type: 'textarea', required: true },
    { id: 'backgroundColor', label: 'Background Colour', type: 'color', required: true },
    { id: 'markWeight', label: 'Mark Weight', type: 'number', required: true },
    { id: 'date', label: 'Date', type: 'date', required: true },
  ];

  const handleConfirm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTask = Object.fromEntries(formData.entries()) as unknown as NewTask;
    await Db.createTask(newTask);
  };

  useEffect(() => {
    Db.getTasks().then(setData);
  }, []);

  return (
    <div className='tasks page'>
      <div style={{ backgroundColor: 'red' }}>
        <span>Phone number ('{}') already exists. Please try another phone number.</span>
      </div>

      <Header title='Tasks' />

      <Searchbar />

      <Accordion
        isForm
        content={[
          <div>
            <form onSubmit={handleConfirm}>
              {newTaskFields.map((field) => (
                <div key={field.id} className='form-floating'>
                  <FormField
                    id={field.id}
                    label={field.label}
                    type={field.type}
                    placeholder={field.label}
                    required={field.required}
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
          <span className='description'>Create New Task</span>
        </div>
      </Accordion>

      <hr />

      <div className='task-group'>
        {data.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

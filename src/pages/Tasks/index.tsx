import { useEffect, useState, useMemo } from 'react';

import { Accordion, FormField, Header, Searchbar, Task } from '~/components';
import { Db } from '~/db/utils/Db';

import type { FormFieldType } from '~/components';

import type { FormEvent } from 'react';
import type { NewTask, Task as TaskType } from '~/db/schema/tasks';

export default function () {
  const [data, setData] = useState<Awaited<ReturnType<(typeof Db)['getTasks']>>>([]);
  const [filteredData, setFilteredData] = useState<Awaited<ReturnType<(typeof Db)['getTasks']>>>([]);
  const [searchString, setSearchString] = useState<string>('');
  const newTaskFields: Array<FormFieldType> = [
    { id: 'title', label: 'Title', required: true },
    {
      id: 'description',
      label: 'Description',
      type: 'textarea',
      required: true,
    },
    {
      id: 'backgroundColor',
      label: 'Background Colour',
      type: 'color',
      required: true,
    },
    { id: 'markWeight', label: 'Mark Weight', type: 'number', required: true },
    { id: 'date', label: 'Date', type: 'date', required: true },
  ];

  /**
   * Only runs when `searchString` or `data` changes.
   */
  useMemo(() => {
    const tasks = [...data];
    const filteredTasks: TaskType[] = [];
    const regex = new RegExp(searchString);

    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];

      if (searchString === '' || regex.test(task.title)) {
        filteredTasks.push(task);
      }
    }

    setFilteredData(filteredTasks);
  }, [searchString, data]);

  const getTasks = () => {
    Db.getTasks().then(setData);
  };

  const handleConfirm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTask = Object.fromEntries(formData.entries()) as unknown as NewTask;
    await Db.createTask(newTask);
    getTasks();
  };

  const deleteTask = async (taskId: TaskType['id']) => {
    await Db.deleteTask(taskId);
    getTasks();
  };

  // Get the tasks when the page is rendered into view
  useEffect(getTasks, []);

  return (
    <div className='tasks page'>
      <Header title='Tasks' />

      <Searchbar handleSearch={setSearchString} />

      <Accordion
        isColoured
        isForm
        content={[
          <div>
            <form onSubmit={handleConfirm}>
              {newTaskFields.map((field) => (
                <div key={field.id} className='form-floating'>
                  <FormField id={field.id} label={field.label} type={field.type} placeholder={field.label} required={field.required} />
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

      <div className='task-group'>
        {/* TODO: Dev */}
        <Task
          key={`a`}
          task={{
            id: 999999,
            backgroundColor: 'red',
            createdAt: new Date().getTime(),
            description: 'this is my description',
            isCompleted: false,
            title: 'My Title',
            date: new Date().toJSON(),
            markWeight: 1,
          }}
          onDelete={() => {}}
        />
        {filteredData.map((task) => (
          <Task key={`${task.id}:${task.createdAt}`} task={task} onDelete={() => deleteTask(task.id)} />
        ))}
      </div>
    </div>
  );
}

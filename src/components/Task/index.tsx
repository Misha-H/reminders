import { useEffect, useState } from 'react';

import { Accordion, FormField, Subtask } from '~/components';
import { Db } from '~/db/utils/Db';

import type { FormEventHandler } from 'react';

import type { NewSubtask } from '~/db/schema/subtasks';
import type { Task } from '~/db/schema/tasks';
import type { FormFieldType } from '~/components';

interface Props {
  task: Task;
  onDelete: () => void;
}

export default function (props: Props) {
  const { onDelete } = props;
  const { createdAt, description, id, isCompleted, markWeight, title } = props.task;
  const [isCreateSubtaskMode, setIsCreateSubtaskMode] = useState<boolean>(false);
  const [data, setData] = useState<Awaited<ReturnType<(typeof Db)['getSubtasks']>>>([]);
  const newSubtaskFields: Array<FormFieldType> = [{ id: 'description', label: 'Description', type: 'textarea', required: true }];

  /**
   * Format a timestamp into an Australian standard date.
   * @param ts Timestamp value in milliseconds since midnight, January 1, 1970 UTC.
   * @returns Date string as `dd/mm/yyyy`
   */
  const formatDate = (ts: number) => {
    const date = new Date(ts);
    const isoDate = date.toISOString();
    const re = /^(\d{4})-(\d{2})-(\d{2})/m;
    const [yyyy, mm, dd] = isoDate.match(re)!.slice(1);

    return `${dd}/${mm}/${yyyy}`;
  };

  const createSubtask: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newSubtask = Object.fromEntries(formData.entries()) as unknown as NewSubtask;
    newSubtask.taskId = id;
    await Db.createSubtask(newSubtask);
    setIsCreateSubtaskMode(false);
  };

  const getSubtasks = () => {
    Db.getSubtasks(id).then(setData);
  };

  useEffect(getSubtasks, []);

  return (
    <Accordion
      className='task'
      content={[
        <div>
          <p className='description'>{description}</p>
          <p>
            <span className='label'>Mark Weight:</span> {markWeight}
          </p>
        </div>,
        <div className='subtask-group'>
          <p className='label'>Subtasks:</p>
          {data.map((subtask) => (
            <Subtask key={subtask.id} subtask={subtask} />
          ))}
        </div>,
        isCreateSubtaskMode ? (
          <form onSubmit={createSubtask}>
            {newSubtaskFields.map((field) => (
              <div key={field.id} className='form-floating'>
                <FormField id={field.id} label={field.label} type={field.type} placeholder={field.label} required={field.required} />
                <label htmlFor={field.id}>{field.label}</label>
              </div>
            ))}

            <div className='actions'>
              <button className='bg-red' type='button' onClick={() => setIsCreateSubtaskMode(false)}>
                Cancel
              </button>
              <button className='bg-green' type='submit'>
                Add Subtask
              </button>
            </div>
          </form>
        ) : (
          <div className='actions'>
            <button className='bg-red' type='button' onClick={onDelete}>
              Delete Task
            </button>
            <button className='bg-green' type='submit' onClick={() => setIsCreateSubtaskMode(true)}>
              Add Subtask
            </button>
          </div>
        ),
      ]}
    >
      <div className='container'>
        <span className='description'>{title}</span>
        <span className='date'>{formatDate(createdAt)}</span>
      </div>
    </Accordion>
  );
}

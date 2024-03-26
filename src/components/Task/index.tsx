import { useEffect, useState, useId } from 'react';

import { Accordion, Subtask } from '~/components';
import { Db } from '~/db/utils/Db';
import { Edit } from '~/assets/icons';

import type { FormEventHandler } from 'react';

import type { Task } from '~/db/schema/tasks';

interface Props {
  task: Task;
  onDelete: () => void;
}

export default function (props: Props) {
  const { onDelete } = props;
  const { createdAt, description, id, isCompleted, markWeight, title } = props.task;
  const [isCreateSubtaskMode, setIsCreateSubtaskMode] = useState<boolean>(false);
  const [data, setData] = useState<Awaited<ReturnType<(typeof Db)['getSubtasks']>>>([]);
  const randomId = useId();

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

  // TODO: Leaving off here, need to create subtask when this form is submitted.
  const createSubtask: FormEventHandler<HTMLFormElement> = async (event) => {
    console.log(event.target);
    // await Db.createSubtask({
    //   description: event.
    // })
    // setIsCreateSubtaskMode(false);
  };

  const getSubtasks = () => {
    Db.getSubtasks(id).then((data) => setData(data));
  };

  useEffect(getSubtasks, []);

  // TODO: Think of the UX on how and where you would like the options to create/update/delete.

  return (
    <Accordion
      content={[
        <div>
          <p className='description'>{description}</p>
          <p className='description'>Mark Weight: {markWeight}</p>
        </div>,
        ...data.map((subtask) => <Subtask key={subtask.id} subtask={subtask} />),
        isCreateSubtaskMode ? (
          <form onSubmit={createSubtask}>
            <div className='form-group'>
              <label className='d-none' htmlFor={randomId}>Subtask</label>
              <input type='text' id={randomId} className='form-control' />
            </div>
          </form>
        ) : (
          <></>
        ),
        <div className='actions'>
          <button className='bg-red' type='button' onClick={onDelete}>
            Delete Task
          </button>
          <button className='bg-green' type='submit' onClick={() => setIsCreateSubtaskMode(true)}>
            Add Subtask
          </button>
        </div>,
      ]}
    >
      <div className='container'>
        <span className='description'>{title}</span>
        <span className='date'>{formatDate(createdAt)}</span>
      </div>
    </Accordion>
  );
}

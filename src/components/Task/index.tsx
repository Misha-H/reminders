import { useEffect, useState } from 'react';

import { Subtask, Accordion } from '~/components';
import { Db } from '~/db/utils/Db';

import type { Task } from '~/db/schema/tasks'

interface Props {
  task: Task;
}

export default function (props: Props) {
  const { createdAt, description, id, isCompleted } = props.task;
  const [data, setData] = useState<Awaited<ReturnType<typeof Db['getSubtasks']>>>([]);

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

  useEffect(() => {
    Db.getSubtasks(id).then(setData);
  }, []);

  // TODO: Think of the UX on how and where you would like the options to create/update/delete.

  return (
    <Accordion
      content={data.map((subtask) => (
        <Subtask key={subtask.id} subtask={subtask} />
      ))}
    >
      <div className='container'>
        <span className='description'>{description}</span>
        <span className='date'>{formatDate(createdAt)}</span>
      </div>
    </Accordion>
  );
}

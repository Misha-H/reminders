import { Subtask, Accordion } from '../../components';

import type { Task } from '../../data';

interface Props {
  task: Task;
}

export default function (props: Props) {
  const { created_at, description, subtasks } = props.task;

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

  return (
    <Accordion
      content={subtasks.map((subtask) => (
        <Subtask key={subtask.id} subtask={subtask} />
      ))}
    >
      <div className='subtask'>
        <span className='description'>{description}</span>
        <span className='date'>{formatDate(created_at)}</span>
      </div>
    </Accordion>
  );
}

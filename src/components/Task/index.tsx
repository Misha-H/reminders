import * as Accordion from '@radix-ui/react-accordion';

import { Subtask } from '../../components';
import ChevronDown from './ChevronDown';

import './index.css';

import type { Task } from '../../data';

interface Props {
  task: Task;
}

export default function (props: Props) {
  const { created_at, description, subtasks } = props.task;
  const hasSubtasks = subtasks.length > 0;

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
    <Accordion.Root type='single' className='accordion-root' collapsible>
      <Accordion.Item value='item-1' className='accordion-item'>
        <Accordion.Header className='accordion-header'>
          <Accordion.Trigger className='accordion-trigger'>
            <div>
              {hasSubtasks && <ChevronDown className='accordion-chevron' />}
            </div>
            <div className='subtask'>
              <span className='description'>{description}</span>
              <span className='date'>{formatDate(created_at)}</span>
            </div>
          </Accordion.Trigger>
        </Accordion.Header>
        {hasSubtasks && (
          <Accordion.Content className='accordion-content'>
            {subtasks.map((subtask) => (
              <Subtask key={subtask.id} subtask={subtask} />
            ))}
          </Accordion.Content>
        )}
      </Accordion.Item>
    </Accordion.Root>
  );
}

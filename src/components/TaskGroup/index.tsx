import { useContext } from 'react';

import { Task } from '../';
import { DataContext } from '../../context';

// TODO: Display all tasks (and subtasks) in a nice fashion - refer to Figma
export default function () {
  const data = useContext(DataContext);

  return (
    <div className='task-group'>
      {data.filteredData.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

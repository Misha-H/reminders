import { useEffect, useState } from 'react';

import { Db } from '~/db/utils/Db';
import { Task } from '~/components';

// TODO: Display all tasks (and subtasks) in a nice fashion - refer to Figma
export default function () {
  const [data, setData] = useState<Awaited<ReturnType<typeof Db['getTasks']>>>([]);
  
  useEffect(() => {
    Db.getTasks().then(setData);
  }, []);

  return (
    <div className='task-group'>
      {data.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
}

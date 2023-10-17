import type { Subtask } from '../../data';

interface Props {
  subtask: Subtask;
}

// TODO: Display subtasks and their actions
export default function (props: Props) {
  const { description } = props.subtask;

  return <div className='subtask'>{description}</div>;
}

import type { Subtask } from '~/db/schema/subtasks';

interface Props {
  subtask: Subtask;
}

// TODO: Display subtasks and their actions
export default function (props: Props) {
  const { description } = props.subtask;

  return <div className='container'>{description}</div>;
}

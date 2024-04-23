import type { Subtask } from '~/db/schema/subtasks';

interface Props {
  subtask: Subtask;
}

// TODO: Display subtasks and their actions
// TODO: We want to display icons for both delete and edit, when we edit, we want to edit in place, when we delete prompt user for confirmation
export default function (props: Props) {
  const { description } = props.subtask;

  return <div className='subtask'>{description}</div>;
}

import { useState } from 'react';

import { cls } from '~/utils';
import { Check, Edit, Trash, X } from '~/assets/icons';

import type { DOMAttributes } from 'react';

import type { Subtask } from '~/db/schema/subtasks';

export interface SubtaskProps {
  subtask: Subtask;
  onDelete: (subtaskId: Subtask['id']) => Promise<boolean>;
  onEdit: (subtaskId: Subtask['id'], newDescription: Subtask['description']) => Promise<boolean>;
}

// TODO: We want to display icons for both delete and edit, when we edit, we want to edit in place, when we delete prompt user for confirmation
export default function (props: SubtaskProps) {
  const { onDelete, onEdit, subtask } = props;
  const { description, id } = subtask;
  const [isInDeleteMode, setIsInDeleteMode] = useState<boolean>(false);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [value, setValue] = useState<string>(description);

  const onInput: DOMAttributes<HTMLTextAreaElement>['onInput'] = (event) => {
    setValue((event.target as HTMLTextAreaElement).value);
  };

  // TODO: Finish this so that icon hides on success (can get from parent promise)
  const handleOnDelete = () => {
    onDelete(id);
  };

  // TODO: Finish this so that icon hides on success (can get from parent promise)
  const handleOnEdit = () => {
    onEdit(id, value);
  };

  return (
    <div className={cls('subtask', isInEditMode && 'edit')}>
      <div className='content'>{!isInEditMode ? <span>{value}</span> : <textarea autoFocus placeholder='...' value={value} onInput={onInput}></textarea>}</div>

      <div className='subtask-actions'>
        {/* For simplicity there are multiple conditional rendering statements. */}
        {!isInDeleteMode && !isInEditMode && (
          <>
            <button className='action-icon' onClick={() => setIsInEditMode(true)}>
              <Edit />
            </button>
            <button className='action-icon' onClick={() => setIsInDeleteMode(true)}>
              <Trash />
            </button>
          </>
        )}

        {/* User has clicked delete */}
        {isInDeleteMode && !isInEditMode && (
          <>
            <button className='action-icon' onClick={handleOnDelete}>
              <Check />
            </button>
            <button className='action-icon' onClick={() => setIsInDeleteMode(false)}>
              <X />
            </button>
          </>
        )}

        {/* User has clicked edit */}
        {isInEditMode && !isInDeleteMode && (
          <>
            <button className='action-icon' onClick={handleOnEdit}>
              <Check />
            </button>
            <button
              className='action-icon'
              onClick={() => {
                setValue(description);
                setIsInEditMode(false);
              }}
            >
              <X />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

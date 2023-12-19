import type { HTMLInputTypeAttribute, ComponentProps } from 'react';

export interface FormFieldEnumItemType {
  id: string;
  label: string;
  value: string;
}

type ElementTypes = ComponentProps<'textarea'> & ComponentProps<'select'> & ComponentProps<'input'>;

export interface FormFieldType extends ElementTypes {
  id: string;
  label: string;
  /**
   * @default 'text'
   */
  type?: HTMLInputTypeAttribute | 'textarea' | 'dropdown';
  /**
   * Array of items for dropdown.
   *
   * Only valid when `type` is equal to `'dropdown'`.
   */
  enum?: Array<FormFieldEnumItemType>;
  /**
   * Default value, or default selection determined by `id`.
   */
  defaultValue?: string;
}

export default function (props: FormFieldType) {
  return props.type === 'textarea' ? (
    <textarea
      {...props}
      id={props.id}
      className='form-control'
      placeholder={props.label}
      defaultValue={props.defaultValue}
    ></textarea>
  ) : props.type === 'dropdown' ? (
    <select
      {...props}
      id={props.id}
      className='form-control'
      placeholder={props.label}
    >
      {props.enum &&
        props.enum.map((item) => (
          <option key={item.id} value={item.value} selected={item.id === props.defaultValue}>
            {item.label}
          </option>
        ))}
    </select>
  ) : (
    <input
      {...props}
      id={props.id}
      type={props.type || 'text'}
      className='form-control'
      placeholder={props.label}
      defaultValue={props.defaultValue}
    />
  );
}

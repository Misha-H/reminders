import type { HTMLInputTypeAttribute } from 'react';

export interface FormFieldEnumItemType {
  id: string;
  label: string;
  value: string;
}

export interface FormFieldType {
  id: string;
  label: string;
  /**
   * @default 'text'
   */
  type?: HTMLInputTypeAttribute | 'textarea' | 'dropdown';
  placeholder?: string;
  /**
   * Array of items for dropdown.
   *
   * Only valid when `type` is equal to `'dropdown'`.
   */
  enum?: Array<FormFieldEnumItemType>;
}

export default function (props: FormFieldType) {
  return props.type === 'textarea' ? (
    <textarea
      id={props.id}
      className='form-control'
      placeholder={props.label}
    ></textarea>
  ) : props.type === 'dropdown' ? (
    <select id={props.id} className='form-control' placeholder={props.label}>
      {props.enum &&
        props.enum.map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
    </select>
  ) : (
    <input
      id={props.id}
      type={props.type || 'text'}
      className='form-control'
      placeholder={props.label}
    />
  );
}

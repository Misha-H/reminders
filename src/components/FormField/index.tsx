import type {
  ChangeEvent,
  ComponentProps,
  HTMLInputTypeAttribute,
} from 'react';

export interface FormFieldEnumItemType {
  id: string;
  label: string;
  value: string;
}

type ElementTypes = ComponentProps<'textarea'> &
  ComponentProps<'select'> &
  ComponentProps<'input'>;

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
  required?: boolean;
  handler?: (
    data: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >['target']['value'],
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
}

export default function ({
  id,
  label,
  type,
  enum: enums,
  required,
  defaultValue,
  handler = () => {},
  ...props
}: FormFieldType) {
  const handleOnChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    handler(event.target.value, event);
  };

  return type === 'textarea' ? (
    <textarea
      {...props}
      id={id}
      name={id}
      className='form-control'
      placeholder={label}
      defaultValue={defaultValue}
      required={required}
      rows={5}
      onChange={handleOnChange}
    ></textarea>
  ) : type === 'dropdown' ? (
    <select
      {...props}
      id={id}
      name={id}
      className='form-control'
      required={required}
      onChange={handleOnChange}
      defaultValue={defaultValue}
    >
      {enums &&
        enums.map((item) => (
          <option key={item.id} value={item.value}>
            {item.label}
          </option>
        ))}
    </select>
  ) : (
    <input
      {...props}
      id={id}
      name={id}
      type={type || 'text'}
      className='form-control'
      placeholder={label}
      defaultValue={defaultValue}
      required={required}
      onChange={handleOnChange}
    />
  );
}

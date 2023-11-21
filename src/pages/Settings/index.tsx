import { Accordion, FormField, Header } from '~/components';

import type { FormFieldType } from '~/components';

interface Group {
  id: string;
  label: string;
  fields: Array<FormFieldType>;
}

export default function () {
  const groups: Array<Group> = [
    {
      id: 'theme',
      label: 'Theme',
      fields: [
        { id: 'theme-background', label: 'Background Colour', type: 'color' },
        { id: 'theme-foreground', label: 'Foreground Colour', type: 'color' },
      ],
    },
    {
      id: 'typography',
      label: 'Typography',
      fields: [
        {
          id: 'font',
          label: 'Font',
          type: 'dropdown',
          enum: [
            {
              id: 'font-monospace',
              label: 'Monospace',
              value: "'Courier New', Courier, monospace",
            },
            {
              id: 'font-arial',
              label: 'Arial',
              value: 'Arial, Helvetica, sans-serif',
            },
            {
              id: 'font-times-new-roman',
              label: 'Times New Roman',
              value: "'Times New Roman', Times, serif",
            },
          ],
        },
        {
          id: 'size',
          label: 'Text Size',
          type: 'dropdown',
          enum: [
            { id: 'size-10', label: '10', value: '10' },
            { id: 'size-11', label: '11', value: '11' },
            { id: 'size-12', label: '12', value: '12' },
            { id: 'size-13', label: '13', value: '13' },
            { id: 'size-14', label: '14', value: '14' },
          ],
        },
      ],
    },
  ];

  const onReset = () => {
    // TODO: Have some stateful context which tracks the current state of settings.
    // Have default items in a context that can be used to revert changes.
  }

  return (
    <div className='settings page'>
      <Header title='Settings' />

      {groups.map((group) => (
        <div>
          <h2>{group.label}</h2>

          {group.fields.map((field) => (
            <div key={field.id} className='group'>
              <Accordion
                content={[
                  <FormField
                    id={field.id}
                    label={field.label}
                    type={field.type}
                    enum={field.enum}
                  />,
                ]}
              >
                <div className='container'>
                  <span className='description'>{field.label}</span>
                </div>
              </Accordion>
            </div>
          ))}
        </div>
      ))}

      <div className='actions'>
        <button className='bg-red fit' onClick={onReset}>Reset</button>
      </div>
    </div>
  );
}

import { Accordion, FormField, Header } from '~/components';
import { LocalStorage } from '~/utils';
import { useSettings } from '~/hooks/useSettings';

import type { FormFieldType } from '~/components';

export interface Group {
  id: string;
  label: string;
  fields: Array<FormFieldType & { var: string }>;
}

export default function () {
  const { settings, updateSettings, getSettings } = useSettings();
  const groups: Array<Group> = [
    {
      id: 'theme',
      label: 'Theme',
      fields: [
        {
          id: 'theme-background',
          label: 'Background Colour',
          type: 'color',
          var: '--primary-background-color',
        },
        {
          id: 'theme-foreground',
          label: 'Foreground Colour',
          type: 'color',
          var: '--primary-text-color',
        },
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
          var: '--font-family',
          enum: [
            {
              id: 'font-nunito',
              label: 'Nunito',
              value: "'Nunito', Arial, sans-serif",
            },
            {
              id: 'font-system',
              label: 'System',
              value:
                "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Ubuntu, 'Open Sans', sans-serif",
            },
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
          var: '--font-size',
          enum: [
            { id: 'size-12', label: '12', value: '12px' },
            { id: 'size-13', label: '13', value: '13px' },
            { id: 'size-14', label: '14', value: '14px' },
            { id: 'size-15', label: '15', value: '15px' },
            { id: 'size-16', label: '16', value: '16px' },
            { id: 'size-17', label: '17', value: '17px' },
            { id: 'size-18', label: '18', value: '18px' },
          ],
        },
      ],
    },
  ];

  const onReset = () => {
    LocalStorage.reset();
  };

  return (
    <div className='settings page'>
      <Header title='Settings' />

      <pre>{JSON.stringify(settings, null, 2)}</pre>

      {groups.map((group) => (
        <div key={group.id}>
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
                    defaultValue={settings[group.id][field.id]}
                    handler={(data) => {
                      getSettings();
                      updateSettings(group.id, field.id, field.var, data);
                      console.log(JSON.stringify(settings, null, 2));
                    }}
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
        <button className='bg-red fit' onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
}

import { Accordion, FormField, Header } from '~/components';
import { groups, useSettings } from '~/hooks/useSettings';

export default function () {
  const { settings, resetSettings, updateSettings } = useSettings();

  return (
    <div className='settings page'>
      <Header title='Settings' />

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
                    defaultValue={settings[group.id][field.id].value}
                    handler={(data) => {
                      updateSettings(group.id, field.id, field.var, data);
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
        <button className='bg-red fit' onClick={resetSettings}>
          Reset
        </button>
      </div>
    </div>
  );
}

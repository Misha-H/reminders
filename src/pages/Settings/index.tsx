import { Header, Accordion } from '../../components';

export default function () {
  const groups = [
    {
      id: 'theme',
      label: 'Theme',
      fields: [{ id: 'background', label: 'Background' }],
    },
    {
      id: 'theme',
      label: 'Theme',
      fields: [
        { id: 'font', label: 'Font' },
        { id: 'text-size', label: 'Text Size' },
      ],
    },
  ];

  return (
    <div className='settings-page'>
      <Header title='Settings' />

      {groups.map((group) => (
        <Accordion
          content={group.fields.map((field) => (
            <div>{field.label}</div>
          ))}
        >
          <h3>{group.label}</h3>
        </Accordion>
      ))}
    </div>
  );
}

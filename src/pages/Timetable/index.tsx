import { Header } from '~/components';

export default function () {
  // TODO: Be able to upload file, also have the lastest file fetched only

  return (
    <div className='timetable page'>
      <Header title='Timetable' />

      {/* TODO: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file */}
      <form>
        <label>
          <input type='file' name='file' accept='image/png,image/jpeg' />
        </label>
        <button type='submit'>Submit file</button>
      </form>

      <div className='actions'>
        <button className='bg-red fit'>Reset</button>
      </div>
    </div>
  );
}

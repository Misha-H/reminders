import { useEffect, useState } from 'react';

import { Db } from '~/db/utils/Db';
import { Header } from '~/components';

import type { InputHTMLAttributes } from 'react';

export default function () {
  // State to store the lastest timetable image
  const [fileSrc, setFileSrc] = useState<string>();

  const handleUpload: InputHTMLAttributes<HTMLInputElement>['onChange'] = (event) => {
    // Get the first potential file
    const file = event.target.files?.[0];

    // Only handle when file exist
    if (!file) {
      return;
    }

    // Create a new instance of FileReader to read the file
    const reader = new FileReader();

    // Will fire when the file is read by the file reader
    reader.onload = async (event) => {
      try {
        const result = event.target?.result ?? undefined;
        // Always return a string or undefined (we do not want to handle an ArrayBuffer because <img> does not support it)
        const image = result instanceof ArrayBuffer ? new TextDecoder('utf-8').decode(result) : result;
        // Update database with the new timetable image
        await Db.createTimetable({ image });
        // Update UI with the new timetable image
        setFileSrc(image);
      } catch (error) {
        console.error('Error handling file upload.');
      }
    };

    // Initiate file to read image as base64
    reader.readAsDataURL(file);
  };

  // On load, set the preview to the lastest stored timetable image
  useEffect(() => {
    Db.getLatestTimetable().then(({ image }) => image && setFileSrc(image));
  }, []);

  return (
    <div className='timetable page'>
      <Header title='Timetable' />

      <form>
        <label>
          <input type='file' name='file' accept='image/png,image/jpeg' className='file-btn' onChange={handleUpload} />
        </label>
      </form>

      {fileSrc && <img src={fileSrc} alt='uploaded timetable file' className='img-preview' />}

      <div className='actions'>
        <button className='bg-red fit'>Reset</button>
      </div>
    </div>
  );
}

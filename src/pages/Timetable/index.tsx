import { useEffect, useRef, useState } from 'react';

import { Header } from '~/components';
import { Db } from '~/db/utils/Db';

import type { InputHTMLAttributes } from 'react';

export default function () {
  // State to store the lastest timetable image
  const [dataUri, setFileSrc] = useState<string>();
  const [isPdf, setIsPdf] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const whitelistFormats = ['image/png', 'image/jpeg', 'application/pdf'];

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
        const isPdf = file.type === 'application/pdf';
        const result = event.target?.result ?? undefined;
        setIsPdf(isPdf);
        // Always return a string or undefined (we do not want to handle an ArrayBuffer because <img> does not support it)
        const dataUri = result instanceof ArrayBuffer ? new TextDecoder('utf-8').decode(result) : result;
        // Update database with the new timetable image
        await Db.createTimetable({ dataUri, isPdf });
        // Update UI with the new timetable image
        setFileSrc(dataUri);
      } catch (error) {
        console.error('Error handling file upload.');
      }
    };

    // Initiate file to read image as base64
    reader.readAsDataURL(file);
  };

  // On load, set the preview to the lastest stored timetable image
  useEffect(() => {
    Db.getLatestTimetable().then(({ dataUri, isPdf }) => {
      dataUri && setFileSrc(dataUri);
      isPdf && setIsPdf(isPdf);
    });
  }, []);

  return (
    <div className='timetable page'>
      <Header title='Timetable' />

      <h3>Accepted formats</h3>
      <ul>
        {whitelistFormats.map((format, idx) => (
          <li key={idx}>
            <code>{format}</code>
          </li>
        ))}
      </ul>

      <form>
        <div className='file-group'>
          {/* TODO: Remove if not accepting PDF */}
          <canvas ref={canvasRef}></canvas>

          <label>
            <input type='file' name='file' accept={whitelistFormats.join()} onChange={handleUpload} />
          </label>
        </div>
      </form>

      {dataUri && !isPdf && <img src={dataUri} alt='uploaded timetable file' className='img-preview' />}
      {dataUri && isPdf && <object data={dataUri} type='application/pdf' className='img-preview'></object>}

      <div className='actions'>
        <button className='bg-red fit'>Reset</button>
      </div>
    </div>
  );
}

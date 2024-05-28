import { useEffect, useState, useRef } from 'react';
import { getDocument, GlobalWorkerOptions, PDFWorker, version } from 'pdfjs-dist';

import { Db } from '~/db/utils/Db';
import { Header } from '~/components';

import type { InputHTMLAttributes } from 'react';

export default function () {
  // State to store the lastest timetable image
  const [fileSrc, setFileSrc] = useState<string>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const whitelistFormats = ['image/png', 'image/jpeg', 'application/pdf'];

  // TODO: Issue: Local worker is not working properly
  GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.min.mjs`;
  // GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/+esm`;

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
        if (file.type === 'application/pdf') {
          if (!event.target?.result) {
            return;
          }

          // TODO: Is not handling document
          const doc = getDocument(event.target!.result);
          // const doc = getDocument('https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf');
          console.log('doc', doc);

          doc.promise.then(console.log).catch(console.error).finally(console.info);
          console.log('set doc');

          // file.text().then((fileAsArrayBuffer) => {
          //   const doc = getDocument(fileAsArrayBuffer);
          //   console.log('doc', doc);

          //   doc.promise
          //     .then((pdf) => {
          //       console.log('pdf', pdf);
          //       // pdf.getPage(0).then((page) => {
          //       //   console.log('page', page);
          //       //   const viewport = page.getViewport({ scale: 1 });

          //       //   console.log('canvas', canvasRef.current);
          //       //   if (!canvasRef.current) {
          //       //     return;
          //       //   }

          //       //   const context = canvasRef.current.getContext('2d');
          //       //   canvasRef.current.height = viewport.height;
          //       //   canvasRef.current.width = viewport.width;

          //       //   page.render({ canvasContext: context!, viewport: viewport }).promise.then(() => {
          //       //     if (!canvasRef.current) {
          //       //       return;
          //       //     }

          //       //     console.log(canvasRef.current.toDataURL('image/jpeg'));
          //       //   });
          //       // });
          //     })
          //     .catch(console.error)
          //     .finally(console.info);
          // });

          return;
        }

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

      {fileSrc && <img src={fileSrc} alt='uploaded timetable file' className='img-preview' />}

      <div className='actions'>
        <button className='bg-red fit'>Reset</button>
      </div>
    </div>
  );
}

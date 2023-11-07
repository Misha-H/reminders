import type { PropsWithChildren } from 'react';

interface CardProps {
  // title: string;
}

export default function (props: CardProps & PropsWithChildren) {
  return (
    <div className='card'>
      {/* <h2>{props.title}</h2> */}

      {props.children && <div className='body'>{props.children}</div>}
    </div>
  );
}

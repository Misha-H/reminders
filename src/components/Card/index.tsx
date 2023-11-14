import type { PropsWithChildren } from 'react';

interface CardProps extends PropsWithChildren {
  // title: string;
}

export default function (props: CardProps) {
  return (
    <div className='card'>
      {/* <h2>{props.title}</h2> */}

      {props.children && <div className='body'>{props.children}</div>}
    </div>
  );
}

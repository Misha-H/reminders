import * as Accordion from '@radix-ui/react-accordion';
import { Fragment } from 'react';

import ChevronDown from './ChevronDown';

import type { PropsWithChildren, ReactElement } from 'react';

interface AccordianProps extends PropsWithChildren {
  content: Array<ReactElement>;
  /** @default false */
  isForm?: boolean;
}

export default function (props: AccordianProps) {
  const { content, isForm = false, children } = props;
  const hasContent = content.length > 0;

  return (
    <Accordion.Root type='single' className={`accordion-root${isForm ? ' form' : ''}`} collapsible>
      <Accordion.Item value='item-1' className='accordion-item'>
        <Accordion.Header className='accordion-header'>
          <Accordion.Trigger className='accordion-trigger'>
            <div>
              {hasContent && <ChevronDown className='accordion-chevron' />}
            </div>
            {children}
          </Accordion.Trigger>
        </Accordion.Header>
        {hasContent && (
          <Accordion.Content className='accordion-content'>
            {props.content.map((contentItem, index) => <Fragment key={index}>{contentItem}</Fragment>)}
          </Accordion.Content>
        )}
      </Accordion.Item>
    </Accordion.Root>
  );
}

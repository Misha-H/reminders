import * as Accordion from '@radix-ui/react-accordion';
import { Fragment } from 'react';

import { cls } from '~/utils';
import ChevronDown from './ChevronDown';

import type { PropsWithChildren, ReactElement } from 'react';

interface AccordianProps extends PropsWithChildren {
  content: Array<ReactElement>;
  className?: string;
  /** @default false */
  isColoured?: boolean;
  /** @default false */
  isForm?: boolean;
}

export default function (props: AccordianProps) {
  const { content, className, isColoured = false, isForm = false, children } = props;
  const id = 'item-1';
  const hasContent = content.length > 0;

  return (
    <Accordion.Root
      type='single'
      className={cls('accordion-root', isForm && 'form', isColoured && 'coloured', className)}
      collapsible
    >
      <Accordion.Item value={id} className='accordion-item'>
        <Accordion.Header className='accordion-header'>
          <Accordion.Trigger className='accordion-trigger'>
            <div>{hasContent && <ChevronDown className='accordion-chevron' />}</div>
            {children}
          </Accordion.Trigger>
        </Accordion.Header>
        {hasContent && (
          <Accordion.Content className='accordion-content'>
            {props.content.map((contentItem, index) => (
              <Fragment key={index}>{contentItem}</Fragment>
            ))}
          </Accordion.Content>
        )}
      </Accordion.Item>
    </Accordion.Root>
  );
}

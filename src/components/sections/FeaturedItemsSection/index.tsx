import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import { Action } from '../../atoms/Action';
import { FeaturedItem } from './FeaturedItem';
import { FC } from 'react';
import type * as types from '.contentlayer/types';

export type Props = types.FeaturedItemsSection;

export const FeaturedItemsSection: FC<Props> = (props) => {
  const cssId = props.elementId ?? null;
  const colors = props.colors ?? 'colors-a';
  const styles = props.styles ?? {};
  const sectionWidth = styles.self?.width ?? 'wide';
  const sectionHeight = styles.self?.height ?? 'auto';
  const sectionJustifyContent = styles.self?.justifyContent ?? 'center';
  const featuredItems = props.items ?? [];
  return (
    <div
      id={cssId}
      {...getDataAttrs(props)}
      className={classNames(
        'sb-component',
        'sb-component-section',
        'sb-component-featured-items-section',
        colors,
        'flex',
        'flex-col',
        'justify-center',
        mapMinHeightStyles(sectionHeight),
        styles.self?.margin,
        styles.self?.padding ?? 'py-12 px-4',
        styles.self?.borderColor,
        styles.self?.borderStyle ? mapStyles({ borderStyle: styles.self?.borderStyle }) : 'border-none',
        styles.self?.borderRadius ? mapStyles({ borderRadius: styles.self?.borderRadius }) : null
      )}
      style={{
        borderWidth: styles.self?.borderWidth ? `${styles.self?.borderWidth}px` : null
      }}
    >
      <div className={classNames('flex', 'w-full', mapStyles({ justifyContent: sectionJustifyContent }))}>
        <div className={classNames('w-full', mapMaxWidthStyles(sectionWidth))}>
          {props.title && (
            <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} data-sb-field-path=".title">
              {props.title}
            </h2>
          )}
          {props.subtitle && (
            <p
              className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                'mt-6': props.title
              })}
              data-sb-field-path=".subtitle"
            >
              {props.subtitle}
            </p>
          )}
          {featuredItems.length > 0 && (
            <div
              className={classNames('grid', 'gap-6', 'lg:gap-8', mapColStyles(props?.columns || 3), {
                'mt-12': props.title || props.subtitle
              })}
              data-sb-field-path=".items"
            >
              {props.items.map((item, index) => (
                <FeaturedItem key={index} {...item} enableHover={props.enableHover} data-sb-field-path={`.${index}`} />
              ))}
            </div>
          )}
          {FeaturedItemActions(props)}
        </div>
      </div>
    </div>
  );
};

const FeaturedItemActions: FC<types.FeaturedItemsSection> = (props) => {
  const actions = props.actions ?? [];
  if (actions.length === 0) {
    return null;
  }
  const styles = props.styles ?? {};
  return (
    <div className="mt-12 overflow-x-hidden">
      <div
        className={classNames(
          'flex',
          'flex-wrap',
          'items-center',
          '-mx-2',
          styles.actions ? mapStyles(styles.actions) : null
        )}
        data-sb-field-path=".actions"
      >
        {actions.map((action, index) => (
          <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" data-sb-field-path={`.${index}`} />
        ))}
      </div>
    </div>
  );
};

function mapColStyles(columns: number) {
  switch (columns) {
    case 4:
      return 'md:grid-cols-4';
    case 3:
      return 'md:grid-cols-3';
    case 2:
      return 'md:grid-cols-2';
  }
  return null;
}

function mapMinHeightStyles(height: string) {
  switch (height) {
    case 'screen':
      return 'min-h-screen';
  }
  return null;
}

function mapMaxWidthStyles(width: string) {
  switch (width) {
    case 'narrow':
      return 'max-w-screen-md';
    case 'wide':
      return 'max-w-screen-xl';
    case 'full':
      return 'max-w-full';
  }
  return null;
}

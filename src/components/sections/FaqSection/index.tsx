import * as React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import { toFieldPath, pickDataAttrs, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { Action } from '../../atoms/Action';
import ChevronIcon from '../../svgs/chevron-right';
import { Markdown } from '../../atoms/Markdown';

export type Props = types.FaqSection & StackbitFieldPath;

export const FaqSection: React.FC<Props> = (props) => {
    const colors = props.colors ?? 'colors-a';
    const styles = props.styles ?? {};
    const sectionWidth = styles.self?.width ?? 'wide';
    const sectionHeight = styles.self?.height ?? 'auto';
    const sectionJustifyContent = styles.self?.justifyContent ?? 'center';
    const faqItems = props.items ?? [];
    const actions = props.actions ?? [];
    return (
        <div
            id={props.elementId}
            {...pickDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-faq-section',
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
                borderWidth: styles.self?.borderWidth
            }}
        >
            <div className={classNames('flex', 'w-full', mapStyles({ justifyContent: sectionJustifyContent }))}>
                <div className={classNames('w-full', mapMaxWidthStyles(sectionWidth))}>
                    <div className="flex flex-wrap">
                        {(props.title || props.subtitle || actions.length > 0) && (
                            <div className={classNames('w-full', { 'lg:w-1/3 lg:pr-3': faqItems.length > 0 })}>
                                {props.title && (
                                    <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} {...toFieldPath('.title')}>
                                        {props.title}
                                    </h2>
                                )}
                                {props.subtitle && (
                                    <p
                                        className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                                            'mt-2': props.title
                                        })}
                                        {...toFieldPath('.subtitle')}
                                    >
                                        {props.subtitle}
                                    </p>
                                )}
                                {actions.length > 0 && (
                                    <div
                                        className={classNames('overflow-x-hidden', {
                                            'mt-6': props.title || props.subtitle
                                        })}
                                    >
                                        <div
                                            className={classNames(
                                                'flex',
                                                'flex-wrap',
                                                'items-center',
                                                '-mx-2',
                                                styles.actions ? mapStyles(styles.actions) : null
                                            )}
                                            {...toFieldPath('.actions')}
                                        >
                                            {actions.map((action, index) => (
                                                <Action key={index} {...action} className="mx-2 mb-3 lg:whitespace-nowrap" {...toFieldPath(`.${index}`)} />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {faqItems.length > 0 && (
                            <div
                                className={classNames('w-full', {
                                    'mt-12 lg:mt-0 lg:w-2/3 lg:pl-3': props.title || props.subtitle || actions.length > 0
                                })}
                                {...toFieldPath('.items')}
                            >
                                {faqItems.map((item, index) => (
                                    <FaqItem key={index} {...item} {...toFieldPath(`.${index}`)} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const FaqItem: React.FC<types.FaqItem & StackbitFieldPath> = (props) => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div className="pb-8 mb-8 border-b border-current sb-faq-section-item" {...pickDataAttrs(props)}>
            {props.question && (
                <h3
                    className={classNames(
                        'flex',
                        'items-center',
                        'justify-between',
                        'cursor-pointer',
                        'text-2xl',
                        props?.styles?.question ? mapStyles(props?.styles?.question) : null
                    )}
                    onClick={() => setIsActive(!isActive)}
                >
                    <span {...toFieldPath('.question')}>{props.question}</span>
                    <span className={classNames('ml-4', isActive ? 'transform rotate-90' : null)}>
                        <ChevronIcon className="w-6 h-6 fill-current" />
                    </span>
                </h3>
            )}
            {props.answer && (
                <Markdown
                    text={props.answer}
                    className={classNames('sb-markdown', 'mt-6', props?.styles?.answer ? mapStyles(props?.styles?.answer) : null, !isActive ? 'hidden' : null)}
                    {...toFieldPath('.answer')}
                />
            )}
        </div>
    );
};

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

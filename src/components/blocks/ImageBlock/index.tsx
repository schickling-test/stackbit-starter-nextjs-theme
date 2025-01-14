import * as React from 'react';
import classNames from 'classnames';
import { toFieldPath, StackbitFieldPath } from '@stackbit/annotations';
import type * as types from 'types';

export type Props = types.ImageBlock & { className?: string } & StackbitFieldPath;

export const ImageBlock: React.FC<Props> = (props) => {
    const { url, altText } = props;
    if (!url) {
        return null;
    }
    const cssClasses = props.className ?? null;
    const styles = props.styles?.self ?? {};
    const imageOpacity = styles.opacity || styles.opacity === 0 ? styles.opacity : 100;
    const annotationPrefix = props['data-sb-field-path'];
    const annotations = annotationPrefix
        ? [`${annotationPrefix}`, `${annotationPrefix}.url#@src`, `${annotationPrefix}.altText#@alt`, `${annotationPrefix}.elementId#@id`]
        : [];

    return (
        <img
            id={props.elementId}
            className={classNames('sb-component', 'sb-component-block', 'sb-component-image-block', cssClasses)}
            src={url}
            alt={altText}
            style={{ opacity: imageOpacity * 0.01 }}
            {...toFieldPath(...annotations)}
        />
    );
};

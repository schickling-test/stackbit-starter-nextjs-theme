import { Button } from './Button';
import { Link } from './Link';
import { makeCommontSectionFields } from './page-sections/common';

export const makeCommonPostsSectionFields = () =>
    ({
        title: { type: 'string' },
        subtitle: { type: 'string' },
        showDate: { type: 'boolean', default: true },
        showAuthor: { type: 'boolean', default: true },
        showExcerpt: { type: 'boolean', default: false },
        variant: { type: 'enum', options: ['variant-a', 'variant-b', 'variant-c'], default: 'variant-a' },
        actions: {
            type: 'list',
            of: [Button, Link],
            default: [{ type: 'Button', label: 'View all', url: '/', style: 'primary' }]
        },
        styles: { type: 'json' },
        ...makeCommontSectionFields()
    } as const);

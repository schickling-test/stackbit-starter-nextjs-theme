import { defineDocumentType } from 'contentlayer/source-files';
import { sectionComponent } from '../common';
import { makeCommonSEOFields } from './common';

export const PageLayout = defineDocumentType(() => ({
    name: 'PageLayout',
    fields: {
        title: { type: 'string', required: true },
        sections: {
            type: 'list',
            of: sectionComponent,
            default: [
                {
                    type: 'HeroSection',
                    elementId: 'homepage-hero-1',
                    colors: 'colors-f',
                    title: 'This Is A Big Hero Headline',
                    text: 'Aenean eros ipsum, interdum quis dignissim non, sollicitudin vitae nisl. Aenean vel aliquet elit, at blandit ipsum. Sed eleifend felis sit amet erat molestie, hendrerit malesuada justo ultrices. Nunc volutpat at erat itae interdum. Ut nec massa eget lorem blandit condimentum et at risus.',
                    actions: [
                        {
                            type: 'Button',
                            label: 'Get Started',
                            url: '/',
                            style: 'primary',
                            elementId: 'hero-main-button'
                        },
                        {
                            type: 'Button',
                            label: 'Learn More',
                            url: '/',
                            style: 'secondary'
                        }
                    ],
                    media: {
                        type: 'ImageBlock',
                        url: 'https://assets.stackbit.com/components/images/default/hero.png',
                        altText: 'Image alt text'
                    },
                    styles: {
                        self: {
                            height: 'auto',
                            width: 'wide',
                            margin: ['mt-0', 'mb-0', 'ml-0', 'mr-0'],
                            padding: ['pt-12', 'pb-12', 'pl-4', 'pr-4'],
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row'
                        },
                        title: {
                            textAlign: 'left'
                        },
                        subtitle: {
                            fontWeight: 400,
                            fontStyle: 'normal',
                            textAlign: 'left'
                        },
                        text: {
                            textAlign: 'left'
                        },
                        actions: {
                            justifyContent: 'flex-start'
                        }
                    }
                }
            ]
        },
        ...makeCommonSEOFields()
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (_) => _._raw.flattenedPath.replace(/^content\/pages(\/|$)/, '')
        }
    }
}));

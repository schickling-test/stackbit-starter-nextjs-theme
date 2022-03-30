import { makeSource } from 'contentlayer/source-files';
import * as documentTypes from './src/contentlayer';

export default makeSource({
    contentDirPath: '.',
    contentDirInclude: ['content'],
    contentDirExclude: ['content/data/style.json'],
    documentTypes,
    // skip `data/style.json`
    onUnknownDocuments: 'skip-ignore'
});

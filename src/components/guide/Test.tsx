import React from 'react';
import MDXContent from '@theme/MDXContent';
import DocsWithSwagger from '../swagger/DocsWithSwagger';
import CallExternalScript from './call-external-script.mdx';

export default function Test() {
  return (
    <DocsWithSwagger>
      <MDXContent>
        <CallExternalScript />
      </MDXContent>
    </DocsWithSwagger>
  );
}
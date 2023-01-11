import React from 'react';
import Layout from '@theme/Layout';
import MDXContent from '@theme/MDXContent';
import DocsWithSwagger from '../components/swagger/DocsWithSwagger';
import CallExternalScript from '../../docs/tutorial-skin-development/call-external-script.mdx';

export default function Test() {
  return (
    <Layout title="외부 스크립트 호출하기" description="외부 스크립트 호출하는 방법에 대해 배웁니다.">
      <DocsWithSwagger>
        <MDXContent>
          <CallExternalScript />
        </MDXContent>
      </DocsWithSwagger>
    </Layout>
  );
}
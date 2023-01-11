import React from 'react';
// 원본 매퍼 가져오기
import MDXProvider from '@theme-original/MDXProvider';
import DocsWithSwagger from '@site/src/components/swagger/DocsWithSwagger';

export default {
  // 기본 매핑 재사용
  ...MDXProvider,
  DocsWithSwagger,
};

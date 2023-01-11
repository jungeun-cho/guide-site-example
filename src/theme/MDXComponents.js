import React from 'react';
// 원본 매퍼 가져오기
import MDXComponents from '@theme-original/MDXComponents';
import SwaggerConnector from '@site/src/components/swagger/SwaggerConnector';
import SwaggerView from '@site/src/components/swagger/SwaggerView';

export default {
  // 기본 매핑 재사용
  ...MDXComponents,
  SwaggerConnector,
  SwaggerView,
};

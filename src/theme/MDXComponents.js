import React from 'react';
// 원본 매퍼 가져오기
import MDXComponents from '@theme-original/MDXComponents';
import SwaggerConnector from '@site/src/components/swagger/SwaggerConnector';
import Swagger from '@site/src/components/swagger/Swagger';
import DataGrid from '@site/src/components/dataGrid/DataGrid';
import Test from '@site/src/components/guide/Test';

export default {
  // 기본 매핑 재사용
  ...MDXComponents,
  SwaggerConnector,
  Swagger,
  DataGrid,
  Test,
};

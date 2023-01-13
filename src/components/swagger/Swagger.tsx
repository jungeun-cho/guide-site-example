import React, { PropsWithChildren, useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import { SwaggerUIOptions } from 'swagger-ui'
import 'swagger-ui-react/swagger-ui.css';
import './swagger.css'
import usePathFilter, { PathFilterType } from '@site/src/hooks/usePathFilter';

export type Domain =
  | 'admin'
  | 'auth'
  | 'claim'
  | 'display'
  | 'marketing'
  | 'member'
  | 'manage'
  | 'order'
  | 'product'
  | 'promotion';

export type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface SwaggerProps {
  domain: Domain | null;
  method?: Method;
  path: string;
  classType?: 'server' | null;
}

const docExpansion = {
  list: 'list',
  full: 'full',
  none: 'none',
} as const;
interface Language {
  prismLanguage: string;
  target: string;
  client?: string;
}
interface SwaggerUIOptionsType extends SwaggerUIOptions {
  theme?: {
    swaggerAbsoluteTop?: string;
    hasSidebar?: boolean;
    languages?: Language[];
  };
}

function Swagger({ classType, domain, path, method = 'get', children }: PropsWithChildren<SwaggerProps>) {
  const prefix = `${classType ? classType + '-' : ''}`;
  const yml = `${domain}${classType ? '-server-public' : '-shop'}.yml`;
  const url = `https://${prefix}docs.shopby.co.kr/spec/${yml}`;
  const [outLink, setOutLink] = useState('');
  const [spec, setSpec] = useState(null);
  const pathFilter = usePathFilter(url);
  const setOutLinkData = (paths: any) => {
    const apiUrl = `https://${classType ? `${classType}-` : ''}docs.shopby.co.kr/?url.primaryName=`;
    const { tags, operationId } = paths[path][method];

    setOutLink(`${apiUrl}${domain}/#/${tags[0]}/${operationId}`);
  };

  const getSwaggerUi = async () => {
    const spec = await pathFilter({ path, method });

    setOutLinkData(spec.paths);
    setSpec(spec);
  };

  useEffect(() => {
    getSwaggerUi();
  }, [url, path, method, domain]);

  return (
    <>
      {children}
      <a className="outlink" href={outLink} target="_blank" rel="noopener noreferrer">
        API 문서 바로가기
      </a>
     {spec && <SwaggerUI
      spec={spec}
      docExpansion={docExpansion.full}/>}
    </>
  );
}

export default Swagger;

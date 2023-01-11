import React, { PropsWithChildren, useEffect, useState } from 'react';
import SwaggerUI from 'swagger-ui-react';
import { SwaggerUIOptions } from '@types/swagger-ui'
import 'swagger-ui-react/swagger-ui.css';
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

function Swagger({ classType, domain, path, method = 'get', children }: PropsWithChildren<SwaggerProps>) {
  const prefix = `${classType ? classType + '-' : ''}`;
  const yml = `${domain}${classType ? '-server-public' : '-shop'}.yml`;
  const url = `https://${prefix}docs.shopby.co.kr/spec/${yml}`;
  const [outlink, setOutlink] = useState('');
  const pathFilter = usePathFilter(url);

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

  const setOutlinkData = (spec: any) => {
    const apiUrl = `https://${classType ? classType + '-' : ''}docs.shopby.co.kr/?url.primaryName=`;
    const { tags, operationId } = spec.paths[path][method];

    setOutlink(`${apiUrl}${domain}/#/${tags[0]}/${operationId}`);
  };

  const swaggerUIOptions: SwaggerUIOptionsType = {
    dom_id: '#ui-wrapper',
    docExpansion: docExpansion.full,
    deepLinking: true,
    theme: {
      swaggerAbsoluteTop: '0px',
    },
  };

  const getSwaggerUi = async () => {
    const spec = await pathFilter({ path, method });
    setOutlinkData(spec);
    SwaggerUI({
      ...swaggerUIOptions,
      spec,
    });
  };

  useEffect(() => {
    getSwaggerUi();
  }, [url, path, method, domain]);

  return (
    <>
      {children}
      <a className="outlink" href={outlink} target="_blank" rel="noopener noreferrer">
        API 문서 바로가기
      </a>
      <div id="ui-wrapper" />
    </>
  );
}

export default Swagger;

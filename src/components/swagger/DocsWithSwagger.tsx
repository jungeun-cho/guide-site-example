import React, { useMemo } from 'react';
import { createContext,useState } from 'react';
import SwaggerView from './SwaggerView';
import './docs-with-swagger.css';
import Swagger, { Domain, Method } from './Swagger';

type MarkdownViewProps = {
  mdFilePath: string;
}

export const SwaggerContext = createContext(null);

function SwaggerDefaultView () {
  return (
    <div className="swagger-empty">
      <p>
        좌측 <em className="api-info-toggle"><span className="api-info-toggle__btn">API 확인하기</span></em> 버튼 클릭시,<br />API 정보를 확인할 수 있습니다.
      </p>
    </div>
  )
}

export type DocInfo = {
  domain: Domain;
  path: string;
  method: Method;
}

export default function DocsWithSwagger({ children }) {
  const [opened, setSwaggerViewOpened] = useState(false);
  const [docInfo, setDocInfo] = useState<DocInfo>(null);
  const [ymlUrl, setYmlUrl] = useState<string>(null);
  const [outlinkUrl, setOutlinkUrl] = useState<string>(null);

  const actions = useMemo(
    () => ({
      toggleSwaggerView(isOpened: boolean, docInfo: DocInfo, ymlUrl: string, outlinkUrl: string) {
        setSwaggerViewOpened(isOpened);

        // if (isOpened) {
        //   setYmlUrl(ymlUrl);
        //   setOutlinkUrl(outlinkUrl);
        // } 

        setDocInfo(isOpened ? docInfo : null);
      }
    }),
    []
  );

  
  return (
      <SwaggerContext.Provider value={actions}>
        <article className="guide">
          <section className="guide__con">{children}</section>
          <section className="guide__swagger">
            {/* {opened ? <SwaggerView link={ymlUrl} outlink={outlinkUrl}/> : <SwaggerDefaultView/> } */}
            {opened && docInfo ? <Swagger domain={docInfo.domain} path={docInfo.path} method={docInfo.method}/> : <SwaggerDefaultView/> }
          </section>
        </article>
        
      </SwaggerContext.Provider>
  )
}
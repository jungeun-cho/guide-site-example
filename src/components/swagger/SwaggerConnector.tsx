import React, { useContext, useState } from 'react';
import { DocInfo, SwaggerContext } from './DocsWithSwagger';
import './swagger-connector.css'

const SwaggerConnector = ({
  url,
  description,
  method,
  title,
}) => {

  const [isApiDocsVisible, setApiDocsVisible] = useState(false);
  const {toggleSwaggerView} = useContext(SwaggerContext);
  
  const handleClick = (e) => {
    const {checked} = e.target;
    const docInfo: DocInfo = {
      domain: 'manage',
      path: '/page/scripts',
      method: 'get'
    }

    toggleSwaggerView(checked, docInfo);
    
    setApiDocsVisible(checked);
  }

  return (
    <dl className="api-info">
      <dt className="api-info__header">
        <span className={`api-info__type ${method}`}>{method}</span>
        <strong>{title}</strong>
      </dt>
      <dd className="api-info__con">
        <strong className="api-info__path">{url}</strong>
        <p>{description}</p>
        <label className="api-info-toggle">
          <input type="checkbox" onClick={handleClick} /><span className="api-info-toggle__btn">api {isApiDocsVisible ? '닫기' : '확인하기'}</span>
        </label>
      </dd>
    </dl>
  );
};

export default SwaggerConnector;
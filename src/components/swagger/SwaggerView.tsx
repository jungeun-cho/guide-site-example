import React from 'react';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

export interface SwaggerProps {
  link: string;
  outlink: string;
}

const SwaggerView = ({ link, outlink }) => {
  
  return (
    <div>
      <a className="outlink" href={outlink} target="_blank" rel="noopener noreferrer">
        API 문서 바로가기
      </a>

      <SwaggerUI url={link} />
    </div>
  );
};

export default SwaggerView;

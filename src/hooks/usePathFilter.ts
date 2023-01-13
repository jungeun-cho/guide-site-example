import axios from 'axios';
import yaml from 'yaml';

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch';

export interface PathFilterType {
  path: string;
  url?: string;
  method?: Method;
}

export default function usePathFilter(url: string) {
  return async ({ path, method = 'get' }: PathFilterType) => {
    if (!url) return;

    try {
      const { data } = await axios.get(url);
      const specObj = yaml.parse(data);

      specObj.paths = { [path]: { [method]: specObj?.paths[path]?.[method] } };
      
      return specObj;
    } catch (e) {
      console.error(e);
    }
  };
}
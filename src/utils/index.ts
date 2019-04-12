'use strict';

/**
 * abc-xyz => AbcXyz
 * @param {string} str
 */
export const varCase = (str: string) => str.replace(/-[a-z]/g, m => m[1].toUpperCase()).replace(/^.{1}/, m => m.toUpperCase());
/**
 * AbcXyz => abc-xyz
 * @param {string} str
 */
export const lowCase = (str: string) => str.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`).replace(/^-/, '');
/**
 * get value of name from location.search
 * @param {string} name search name
 * @returns {string} value of name
 */
export const getUrlParam = (name: string) => {
  const reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`);
  const r = decodeURIComponent(window.location.search.substr(1)).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
};

/**
 * ?a=1&b=2  => {a:'1',b:'2'}
 * @param {string} lsearch =location.search
 */
export const search2obj = (lsearch: string) => {
  const search = lsearch && lsearch.substr(1) || '';
  if (!search) {
    return {};
  }
  const paramsList = search.split('&');
  const params:Object = {};
  paramsList.forEach((i) => {
    if (!i) {
      return;
    }

    const p: string[] = i.split('=');
    if (p.length === 1) {
      Object.defineProperty(params,p[0],{value:''})
    } else {
      Object.defineProperty(params,p[0],{value:p[1]})
    }
  });

  return params;
};

/**
 * {a:'1',b:'2'} => ?a=1&b=2
 * @param {Object} obj like {a:'1',b:'2'}
 */
export const obj2search = (obj: any) => {
  const search = Object.keys(obj).map(i => `${i}=${obj[i]}`).join('&');
  if (!search) {
    return '';
  }
  return `?${search}`;
};

/**
 * {a:'1',b:'2'} => http://xxxxxxx?a=1&b=2
 * @param {Object} obj like {a:'1',b:'2'}
 */
export const getUrlWithSearchObj = (obj: Object) => {
  const params = search2obj(location.search);
  Object.assign(params, obj);

  return `${location.pathname}${obj2search(params)}`;
};

/**
 * get value of name from cookie
 * @param {string} name cookie name
 */
export function getCookie(name: string) {
  const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
  const arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[2]);
  }
  return null;
}

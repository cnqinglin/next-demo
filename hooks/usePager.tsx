// 封装分页组件（JSX 语法）

import LINK from 'next/LINK';
import _ from 'lodash';
type Options = {
    total: Number;
    perpage: Number;
    page: number;  // 页码
    pageTotal: number;
    urlMaker?: (n: number) => string;
}
const defaultUrlMaker = (n:number) => `?page=${n}`

export const usePager = (options: Options) => {
    const { total, perpage, page, pageTotal, urlMaker:_urlMaker } = options;
    const urlMaker = _urlMaker || defaultUrlMaker
    let numbers = [];
    numbers.push(1);
    for (let i = page - 3; i <= page + 3; i++) {
        numbers.push(i)
    };
    numbers.push(total);
    const X = _.uniq(numbers).sort()
        .filter(current => current >= 1 && current <= total)
        .reduce((prev, current) => current - (prev[prev.length - 1] || 0) === 1 ? prev.concat(current) : prev.concat(-1, current), []);

        const pager = (
            <div className="wrapper">
              {page !== 1 && <LINK href={urlMaker(page - 1)}><a>上一页</a></LINK>}
              {X.map(n => n === -1 ?
                <span>...</span> :
                <LINK href={urlMaker(n)}><a>{n}</a></LINK>)}
        
              {page < total &&
              <LINK href={urlMaker(page + 1)}><a>下一页</a></LINK>}
              <span>
                第 {page} / {total} 页
              </span>
        
              <style jsx>{`
                .wrapper {
                  margin: 0 -8px;
                }
                .wrapper > a, .wrapper > span{
                  margin: 0 8px;
                }
              `}</style>
            </div>
        
          );
    return { pager };
}
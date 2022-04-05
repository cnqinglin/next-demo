import Link from 'next/link';
import _ from 'lodash';
import { log } from 'console';

type Options = {
  page: number;
  totalPage: number;
  urlMaker?: (n: number) => string;
}
const defaultUrlMaker = (n: number) => `?page=${n}`

export const usePager = (options: Options) => {
  const { page, totalPage, urlMaker: _urlMaker } = options;
  const urlMaker = _urlMaker || defaultUrlMaker
  const numbers = [];
  numbers.push(1);
  for (let i = page - 2; i <= page + 2; i++) {
    numbers.push(i);
  }
  
  numbers.push(totalPage);
  const pageNumbers = _.uniq(numbers).sort().filter(n => n >= 1 && n <= totalPage)
    .reduce((result, n) => n - (result[result.length - 1] || 0) === 1 ?
      result.concat(n) : result.concat(-1, n), []);
  const pager = totalPage > 1 ? (
      <div className="wrapper">
      {page !== 1 && <Link href={urlMaker(page - 1)}><a>上一页</a></Link>}
      {pageNumbers.map(n => n === -1 ?
        <span key={n}>...</span> :
        <Link key={n} href={urlMaker(n)}>{
            n == page ?
            <a className='current' key={n}>{n}</a> :
            <a className='pageNo' key={n}>{n}</a>}
        </Link>
      )}
      {page < totalPage &&
        <Link href={urlMaker(page + 1)}><a>下一页</a></Link>}
      <span>
        第 {page} / {totalPage} 页
      </span>

        <style jsx>{`
        .wrapper {
          padding: 8px 0;
        }
        .wrapper > a, .wrapper > span{
          margin: 0 8px;
        }
        .pageNo {
          border: 1px solid rgba(83,97,224,0.5);
          padding: 0 6px 0 6px;
        }
        .current {
          border: 1px solid rgba(83, 97, 224, 0.5);
          padding: 0 6px 0 6px;
          color: red;
        }
        .current:hover,.pageNo:hover {
          border: 1px solid red;
          padding: 0 6px 0 6px;
          color: red;
        }
      `}</style>
    </div>
  ) : null;
  return { pager };
};
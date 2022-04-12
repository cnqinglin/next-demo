import {ChangeEventHandler, ReactChild, useCallback, useState} from 'react';
import { AxiosResponse } from 'axios';
import cs from 'classnames';

type Field<T> = {
    label: string;
    key: keyof T;
    // type: 'textarea' | 'input',
  textIlag: Boolean;
  className: String;
}
type useCommentOptions<T> = {
  labelWidth: string;
  initFormData: T;
  fields: Field<T>[];
  buttons: ReactChild;
  submit: {
    request: (formData: T) => Promise<AxiosResponse<T>>;
    success: () => void;
    fail: () => void;
  }
}

export function useComment<T>(options: useCommentOptions<T>) {
  const {
    initFormData, fields, buttons, submit,labelWidth } = options;
  // 非受控
  // 用户只需要传一个initFormData 就可以，用户不用自己去写逻辑，组件自己会计算出error，使用者只需在某一个时刻获取error就可以
  const [formData, setFormData] = useState(initFormData);
//   initFormData = { titel: '', content: '', commentContent: '' };
  // initErrors = {username: [], password: []}
  const [errors, setErrors] = useState(() => {  
    const e: { [k in keyof T]?: string[] } = {};
    for (let key in initFormData) {
      if (initFormData.hasOwnProperty(key)) { // 为了严谨
        e[key] = [];
      }
    }
    return e;
  });
  const onChange = useCallback((key: keyof T, value: any,) => {
    setFormData({...formData, [key]: value,});
  }, [formData]);
  const _onSubmit = useCallback((e) => {
    e.preventDefault();
    submit.request(formData).then(submit.success,
      (error) => {
        if (error.response) {
          const response: AxiosResponse = error.response;
          if (response.status === 422) {
            setErrors(response.data);
          } else if (response.status === 401) {
            window.alert('请先登录');
            window.location.href = `/sign_in?returnTo=${encodeURIComponent(window.location.pathname)}`;
          }
        }
      }
    );

  }, [submit, formData]);
    
  const form = (
    <form onSubmit={_onSubmit}>
      {fields.map(field =>
        <div key={field.key.toString()} className={`label`}>
          <label>
            <span className='labelTitle'>
              {field.label}
            </span>
              {!field.textIlag && formData[field.key].toString()}
              {field.textIlag &&
                <textarea
                  className={cs(`neirong`)}
                  onChange={(e) => onChange(field.key, e.target.value)}
                  value={formData[field.key]?.toString()}
                />
              }
          </label>
                    
          {errors[field.key]?.length > 0 && <div>
            {errors[field.key].join(',')}
              </div>}
              
        </div>
      )}
      <div className='btn'>
        {buttons}
      </div>
      <style jsx>{`
            .filrld{
              margin: 8px 0;
            }
            .label {
              display: flex;
              line-height: 64px;
            }
            .labelTitle {
              width: 100px;
              font-size: 24px;
              font-weight: 400;
            }
            .label input {
              height: 32px;
            }
            .label > text-area {
              width: 1000px;
              height: 10em;
              resize: none;
            }
            .label > .text{
              white-space: nowrap;
              margin-right: 1em;
            }
            .label > .control{
              width: 100%;
            }
      `}</style>
    </form>
  );
  return {
    form: form, setErrors: setErrors
  };
}
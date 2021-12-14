// 封装Form组件
/**
 * 这个组件以后不会再用了，仅供学习使用，封装的思路 
 **/
import { type } from "os"
import { ChangeEventHandler, FormEventHandler } from "react"

type Props = {
    onSubmit: FormEventHandler;
    fields: {
        label: string,
        type: 'text' | 'password' | 'textarea',
        value:string | number,
        onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
        errors: string[],
    }[],
    buttons: React.ReactChild
}

export const Form: React.FC<Props> = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            {props.fields.map(field =>
                <div key={field.label}>
                    <label>
                        {field.label}
                        {field.type === "text" ? <input type={field.type} value={ field.value} onChange={field.onChange} /> :
                            <textarea onChange={field.onChange}>{ }</textarea>}
                    </label>
                    {
                        field.errors?.length > 0 && <div>
                            {field.errors.join(',')}
                        </div>}
                </div>
            )}
            <div>
                {props.buttons}
            </div>
        </form>
    )
}
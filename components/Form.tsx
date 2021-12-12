// 封装Form组件
import { type } from "os"
import { ChangeEventHandler, FormEventHandler } from "react"

type Props = {
    onSubmit: FormEventHandler;
    fields: {
        label: string,
        type: 'text' | 'password',
        onChange: ChangeEventHandler<HTMLInputElement>,
        errors: string[],
    }[],
    buttons:React.ReactChild
}

export const Form: React.FC<Props> = (props) => {
    return (
        <form onSubmit={ props.onSubmit}>
            {props.fields.map(field =>
                <div key={field.label}>
                    <label>
                        {field.label}
                        <input type={field.type} onChange={field.onChange} />
                    </label>
                    {
                    field.errors?.length > 0 && <div>
                        { field.errors.join(',')}
                    </div>}
                </div>
            )}
            <div>
              {props.buttons}
            </div>
        </form>
    )
}
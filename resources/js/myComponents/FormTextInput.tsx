export interface FormTextInputProp {
    name: string;
    placeholder: string;
    type?: string;
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormTextInput = ({ value ,name, placeholder, onChange, type='text' }: FormTextInputProp) => {
    return (
        <>
            <div>
                <input type={type} name={name} placeholder={placeholder} value={value} onChange={onChange}/>
            </div>

            {/* <div>
                <InputLabel htmlFor="email" value="Email" />
                <TextInput id="email" type="email" name="email" value={data.email} className="mt-1 block w-full" autoComplete="username" isFocused={true} onChange={(e) => setData('email', e.target.value)} />
                <InputError message={errors.email} className="mt-2" />
            </div> */}
        </>
    );
};

export default FormTextInput;
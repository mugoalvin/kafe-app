import { useEffect, FormEventHandler } from 'react';
import { useForm } from '@inertiajs/react';
import Form from '@/myComponents/Form'
import FormTextInput from '@/myComponents/FormTextInput'

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        username: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'))
    };
	
	return (
		<Form buttonText='Login' title='Login' onSubmit={submit} anchorText='Sign Up Instead?' anchorLink='register'>
			<FormTextInput name='email' placeholder='Email' value={data.email} onChange={(e) => setData('email', e.target.value)}/>
			<FormTextInput name='password' placeholder='Password' value={data.password}  onChange={(e) => setData('password', e.target.value)} type='password'/>
		</Form>
    );
}
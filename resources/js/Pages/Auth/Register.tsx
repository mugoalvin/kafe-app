import { useEffect, FormEventHandler } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import Form from '@/myComponents/Form';
import FormTextInput from '@/myComponents/FormTextInput';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({ name: '', last_name: '', username: '', email: '', password: '', password_confirmation: '' });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        let response = post(route('register'))
        console.log(response)
    };


    return (
        <Form buttonText='Register' title='Create New Account' onSubmit={submit} anchorText='Login Instead' anchorLink='login'>
            <FormTextInput key='name' name='name' placeholder='First Name' value={data.name}  onChange={(e) => setData('name', e.target.value) } type='text'/>
            <FormTextInput key='last_name' name='last_name' placeholder='Last Name' value={data.last_name}  onChange={(e) => setData('last_name', e.target.value) } type='text'/>
            <FormTextInput key='username' name='username' placeholder='Username' value={data.username}  onChange={(e) => setData('username', e.target.value) } type='text'/>
            <FormTextInput key='email' name='email' placeholder='Email' value={data.email}  onChange={(e) => setData('email', e.target.value) } type='text'/>
            <FormTextInput key='password' name='password' placeholder='Password' value={data.password}  onChange={(e) => setData('password', e.target.value) } type='password'/>
            <FormTextInput key='password_confirmation' name='password_confirmation' placeholder='Password Confirmation' value={data.password_confirmation}  onChange={(e) => setData('password_confirmation', e.target.value) } type='password'/>
            {/* <div>
                <input type="checkbox" name="isCustomer" onChange={(e) => setData('isCustomer', !data.isCustomer)} checked={data.isCustomer}/> Are You A Customer?
            </div> */}

            {/* <FormTextInput key='name' name='name' placeholder='First Name' value="John"  onChange={(e) => setData('name', e.target.value) } type='text'/>
            <FormTextInput key='last_name' name='last_name' placeholder='Last Name' value="Doe"  onChange={(e) => setData('last_name', e.target.value) } type='text'/>
            <FormTextInput key='username' name='username' placeholder='Username' value="doejohn"  onChange={(e) => setData('username', e.target.value) } type='text'/>
            <FormTextInput key='email' name='email' placeholder='Email' value="john@gmail.com"  onChange={(e) => setData('email', e.target.value) } type='text'/>
            <FormTextInput key='password' name='password' placeholder='Password' value="qwertyuiop"  onChange={(e) => setData('password', e.target.value) } type='password'/>
            <FormTextInput key='password_confirmation' name='password_confirmation' placeholder='Password Confirmation' value="qwertyuiop"  onChange={(e) => setData('password_confirmation', e.target.value) } type='password'/>
            <div>
                <input type="checkbox" name="isCustomer" onChange={(e) => setData('isCustomer', !data.isCustomer)} checked={data.isCustomer}/> Are You A Customer?
            </div> */}
        </Form>
    );

    function getCookie(name : string) {
        let cookieValue = undefined;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
}
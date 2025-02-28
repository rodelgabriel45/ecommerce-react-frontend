import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { loginFormSchema } from '@/utils/validation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLoginMutation } from '@/features/api/auth';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { loginSuccess } from '@/features/userSlice/userSlice';
import { Loader2 } from 'lucide-react';
import { User } from '@/types/types';
import { Link } from 'react-router-dom';

type LoginFormSchema = z.infer<typeof loginFormSchema>;

interface LoginResponse {
  token: string;
  user: User;
}

type DataError = {
  data: {
    success: boolean;
    statusCode: number;
    message: string;
  };
};

const Login = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const { user: authUser } = useAppSelector((state) => state.user);
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: LoginFormSchema) => {
    try {
      const result = await login(formData);

      if (result.error) {
        console.error('Failed to login:', result.error);
        return; // Handle error appropriately
      }

      if ('data' in result && 'token' in result.data && 'user' in result.data) {
        // Extract token and user from the data
        const { token, user } = result.data as LoginResponse;

        // Save token to localStorage
        localStorage.setItem('authToken', token);

        // Dispatch loginSuccess to update Redux state with user data
        dispatch(loginSuccess(user));

        // Optionally navigate to another page or update UI
      } else {
        console.error('Invalid response format from login API');
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (authUser) {
    return (
      <div>
        <h2 className='font-medium'>{authUser.name}</h2>
        <p>@{authUser.email}</p>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto flex flex-col mt-20'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter Email...'
                    {...field}
                    className='text-lg p-4'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter Password...'
                    {...field}
                    type='password'
                    className='text-lg p-4'
                  />
                </FormControl>
              </FormItem>
            )}
          />
          {error && (
            <p className='text-red-500 mt-4'>
              {(error as DataError).data.message}
            </p>
          )}
          <div className='flex gap-4 items-center'>
            <Button disabled={isLoading} type='submit'>
              {isLoading ? (
                <div>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Loading...
                </div>
              ) : (
                'Submit'
              )}
            </Button>
            <Link to='/register' className='text-blue-500 hover:underline'>
              {"Don't"} have an account?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRegisterMutation } from '@/features/api/auth';
import { registerFormSchema } from '@/utils/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { z } from 'zod';

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

type DataError = {
  data: {
    success: boolean;
    statusCode: number;
    message: string;
  };
};

const Register = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (formData: RegisterFormSchema) => {
    const result = await register(formData);
    if (result.error) {
      return;
    }

    form.reset();
    toast.success('Account created successfully');
  };

  return (
    <div className='max-w-2xl mx-auto flex flex-col mt-20'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter Full Name...'
                    {...field}
                    className='text-lg p-4'
                  />
                </FormControl>
              </FormItem>
            )}
          />

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
            <Link to='/login' className='text-blue-500 hover:underline'>
              Already have an account?
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Register;

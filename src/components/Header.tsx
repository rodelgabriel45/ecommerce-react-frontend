import { Search, ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/features/hooks';

const Header = () => {
  const user = useAppSelector((state) => state.user);

  console.log(user);

  return (
    <header>
      <nav className='bg-gray-900'>
        <div className='flex justify-between items-center max-w-7xl mx-auto p-4 shadow-md text-white'>
          <Button asChild>
            <Link to='/' className='text-2xl font-bold'>
              Logo
            </Link>
          </Button>

          <div className='flex w-full max-w-sm items-center space-x-2'>
            <Input type='email' placeholder='Search product...' />
            <Button type='submit' variant='secondary'>
              <Search />
            </Button>
          </div>
          <ul className='flex gap-2 items-center'>
            <li>
              <Button asChild>
                <Link to='/'>
                  <ShoppingCart />
                </Link>
              </Button>
            </li>
            <li>
              <Button asChild>
                <Link to='/login' className='text-xl'>
                  {user.user ? user.user.name : 'Login'}
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

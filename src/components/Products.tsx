import { useGetProductsQuery } from '@/features/api/products';
import { Loader2 } from 'lucide-react';
import { Button } from './ui/button';

const Products = () => {
  const { data, isLoading, error } = useGetProductsQuery();

  return (
    <div>
      {isLoading && (
        <p>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Loading...
        </p>
      )}
      {error && (
        <p className='text-red-500 font-medium text-xl'>
          Something went wrong...
        </p>
      )}
      <ul className='grid grid-cols-2 max-w-6xl gap-4'>
        {data &&
          data.map((product) => {
            return (
              <li
                key={product.id}
                className='flex flex-col border max-w-2xl p-4 gap-6'
              >
                <h2 className='font-semibold text-xl'>{product.name}</h2>
                <p>{product.description}</p>
                <Button className='w-[10rem]'>Add to cart</Button>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Products;

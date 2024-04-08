import React, { useState, useEffect } from 'react';
import { toAbsoluteUrl } from '../../../_duhope/helpers';

type Props = {
  className: string;
  products: any;
  orders: any;
};

const TopSellingProducts: React.FC<Props> = ({ className, products, orders }) => {
  const [productQuantities, setProductQuantities] = useState<any[]>([]);

  useEffect(() => {
    const calculateProductQuantities = () => {
      const quantities: any[] = [];

      // Iterate through each order
      orders.forEach((order) => {
        if (order.products) {
          // Iterate through each product in the order
          order.products.forEach((product) => {
            const productId = product.productId;

            // Find the product in the quantities array or add a new entry
            const existingProduct = quantities.find((item) => item.id === productId);

            if (existingProduct) {
              existingProduct.quantity += product.quantity;
            } else {
              quantities.push({
                id: productId,
                quantity: product.quantity,
                name: product.name,  // Add product name
                image: product.main_image_url || toAbsoluteUrl('/media/svg/avatars/001-boy.svg'),  // Add product image
              });
            }
          });
        }
      });
      // Set the state with the new quantities
      setProductQuantities(quantities);
    };

    calculateProductQuantities();
  }, [orders]);

  const getTopSellingProducts = () => {
    // Sort products based on quantity sold
    const sortedProducts = productQuantities.slice().sort((a, b) => b.quantity - a.quantity);

    // Select top 4 products
    return sortedProducts.slice(0, 4);
  };

  const topSellingProducts = getTopSellingProducts()

  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 pt-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Top selling products - Items sold</span>
        </h3>
      </div>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <table className='table align-middle gs-0 gy-3'>
            <thead>
              <tr>
                <th className='p-0 w-50px'></th>
                <th className='p-0 min-w-150px'></th>
                <th className='p-0 min-w-140px'></th>
                <th className='p-0 min-w-120px'></th>
              </tr>
            </thead>
            <tbody>
              {topSellingProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className='symbol symbol-50px me-2'>
                      <span className='symbol-label'>
                        <img
                          src={product.image}
                          className='h-75 rounded align-self-end'
                          alt=''
                        />
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className='text-dark fw-bold text-hover-primary mb-1 fs-6'>
                      {product.name}
                    </span>
                    <span className='text-muted fw-semibold d-block'>Product Description</span>
                  </td>
                  <td>
                    <span className='text-muted fw-semibold d-block fs-7'>Quantity Sold</span>
                    <span className='text-dark fw-bold d-block fs-5'>
                      {product.quantity || 0}
                    </span>
                  </td>
                  <td className='text-end'>
                    {/* You can add additional columns or data here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;
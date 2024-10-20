import product1 from '../../images/category/category-phones.webp';
import product2 from '../../images/category/category-tablets.webp';
import product3 from '../../images/category/category-accessories.webp';
import { ROUTES } from './routes';

export const CATEGORY = [
  {
    id: 1,
    name: 'Mobile phones',
    category: 'phones',
    title: 'mobile phones category',
    color: '#6d6474',
    img: product1,
    routes: ROUTES.PHONES,
    length: 0,
  },
  {
    id: 2,
    name: 'Tablets',
    category: 'tablets',
    title: 'tablets category',
    color: '#8D8D92',
    img: product2,
    routes: ROUTES.TABLETS,
    length: 0,
  },
  {
    id: 3,
    name: 'Accessories',
    category: 'accessories',
    title: 'accessories category',
    color: '#973D5F',
    img: product3,
    routes: ROUTES.ACCESSORIES,
    length: 0,
  },
];

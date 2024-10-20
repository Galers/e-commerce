import { FC, useEffect } from 'react';

import { Header } from '@components/header/Header';
import { Footer } from '@components/footer/Footer';

import { AppRoutes } from '@routes/Routes';
import { useAction } from '@hooks/useActions';

import styles from './App.module.scss';

export const App: FC = () => {
  const { getProducts, getPhones, getTablets, getAccessories } = useAction();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getProducts(),
          getPhones(),
          getTablets(),
          getAccessories(),
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [getProducts, getPhones, getTablets, getAccessories]);

  return (
    <div className={styles.App}>
      <Header />
      <main>
        <div className="container">
          <AppRoutes />
        </div>
      </main>
      <Footer />
    </div>
  );
};

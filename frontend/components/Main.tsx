import React from 'react';
import { AmazonContext } from '../context/AmazonContext';
import { Cards } from './Cards';


const styles = {
  container: `h-full w-full flex flex-col mt-[50px] pr-[50px] overflow-hidden`,
  recentTitle: `text-2xl font-bold text-center mb0[20px] text-center mt[40px]`,
  recentTransactionList: `flex flex-col`,
  transactionCard: `flex justify-between mb-[20px] p-[30px] bg-`
}

export const Main = () => {

  const {} = React.useContext(AmazonContext)
  return (
    <div className={styles.container}>
      <Header/>
      <Featured/>
      <Cards/>
    </div>
  );
};

import React from 'react';
import { AmazonContext } from '../context/AmazonContext';
import { Card } from './Card';


export const Cards = () => {
  const styles = {
    container: `h-full w-full flex flex-col ml-[20px] -mt-[50px]`,
    title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
    cards: `flex items-center  flex-wrap gap-[80px]`,
  }
  const { assets } = React.useContext(AmazonContext)

  return (
    <div className={styles.container}>
      <div className={styles.title}>New Release</div>
      <div className={styles.cards}>
        <div className={styles.cards}>
          {assets.map((item: any) => {
            return <Card key={item.id} item={item.attributes} />
          })}
        </div>
      </div>
    </div>
  )
}

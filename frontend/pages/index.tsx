import type { NextPage } from 'next'
import { Sidebar } from '../components/Sidebar';
import { Main } from '../components/Main';


const styles = {
  container: `h-full w-full flex bg=[#fff]`
}



const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Sidebar/>
      <Main/>
    </div>
  )
}

export default Home

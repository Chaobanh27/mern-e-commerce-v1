import CategoryList from '../components/CategoryList'
import HorizontalCardProduct from '../components/HorizontalCardProduct'

const Home = () => {
  return (
    <>
      <CategoryList/>
      <HorizontalCardProduct category={'airpodes'} heading={'Top\'s Airpodes'}/>
    </>
  )
}

export default Home
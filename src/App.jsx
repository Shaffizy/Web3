import './App.css'
import { Navbar, Star, Slider } from './components'
import { Header ,About ,Partners , Services, Faq, Case, Team, Footer} from './containers'



function App() {
  return (
    <div className="App">
      <Star />
      <div className='lookpage'>
        <Navbar />
        <Header />
        <Slider />
      </div>
      <About/>
      <Partners/>
      <Services/>
      <Case/>
      <Team/>
      <Faq/>
      <Footer/>
      
      
    </div>
  )
}

export default App

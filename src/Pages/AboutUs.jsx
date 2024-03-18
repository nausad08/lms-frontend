
import HomeLayout from '../Layouts/HomeLayout'
import apj from "../assets/Images/apj.png"
import bili from "../assets/Images/billGates.png"
import ein from "../assets/Images/einstein.png"
import nelson from "../assets/Images/nelsonMandela.png"
import steve from "../assets/Images/steveJobs.png"


import aboutMainImage from "../assets/Images/aboutMainImage.png"
import CarouselSlide from '../Components/CarouselSlide'

const AboutUs = () => {

   const celebrities = [
    {
      title:'Nelson Mandela',         
      description:"Education is the most powerful weapon which you can use to change the world",
      image:nelson,
      slideNumber:1
    },
    {
      title:'Bill Gates',         
      description:"Most people overestimate what they can do in one year and underestimate what they can do in ten years.",
      image:bili,
      slideNumber:2
    },
    {
      title:'Apj Abdul Kalam',         
      description:"Look at the sky. We are not alone. The whole universe is friendly to us and conspires only to give the best to those who dream and work.",
      image:apj,
      slideNumber:3
    },
    {
      title:'Steve Jobs',         
      description:"Don’t let the noise of others’ opinions drown out your own inner voice.",
      image:steve,
      slideNumber:4
    },
    {
      title:'Albert Einstein',         
      description:"Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.",
      image:ein,
      slideNumber:5
    },
  ]
  return (
    <HomeLayout>
      <div className='pl-20 pt-20 flex flex-col text-white'>
        <div className='flex items-center gap-5 ms-10'>
          <section className='w-1/2 space-y-10'>
            <h1 className='text-6xl text-yellow-600 font-semibold'>
              Affordable and quality education
            </h1>
            <p className='text-xl text-gray-200'>
              Our goal is to provide and quality education to the world.
              we are providing the plattfrom for the aspiring teacher and students to share
              their skills. creativity and knoledge to each other
            </p>
          </section>
          <div className='w-1/2 '>
            <img 
             id='tezt1'
             style={{
              filter: "drop-shadow(0px 10px 10px rgb(0,0,0));"
             }}
             className='drop-shadow-2xl'
             alt='aboutpage'
                
                src={aboutMainImage}
            />

          </div>
        </div>

        <div className="carousel w-1/2 my-16 mx-auto">
            {
              celebrities.map((celebrity) => <CarouselSlide key={celebrity.slideNumber} image={celebrity.image} title={celebrity.title} slideNumber={celebrity.slideNumber} description={celebrity.description} totalSlide={celebrities.length} />)
            }
        </div>
      </div>
      
    </HomeLayout>
  )
}

export default AboutUs

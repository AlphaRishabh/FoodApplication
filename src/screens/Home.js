import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Cards from '../components/Cards';
// import Carousel from '../components/Carousel';

function Home() {
    const [search,setSearch]=useState('')
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    console.log(response[0], response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <div> <Navbar /></div>
        <div><div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>

<div className="carousel-inner" id="carousel" style={{width:"193vh"}}>
<div className="carousel-caption" style={{zIndex:"10"}}>
  
     <div className="d-flex justify-content-center">
     <input className="form-control me-2" type="search" id="carouselid" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />

    {/* <button className="btn btn-outline-light text-black bg-warning" type="submit">Search</button> */}
  </div>

    </div>

  <div className="carousel-item active">
    <img src="https://source.unsplash.com/random/300×300?Tikka"  className="d-block " alt="..." style={{ height:"80vh" ,width:"170vh", marginLeft:"90px",marginTop:"50px",borderRadius:"10px"}}/>
  </div>
  <div className="carousel-item">
    <img src="https://source.unsplash.com/random/300×300?Cheese" className="d-block " alt="..." style={{height:"80vh",width:"170vh", marginLeft:"90px", marginTop:"50px",borderRadius:"10px"}}/>
  </div>
  <div className="carousel-item">
    <img src="https://source.unsplash.com/random/300×300?Biryani" className="d-block " alt="..." style={{ height:"80vh",width:"170vh", marginLeft:"90px",marginTop:"50px",borderRadius:"10px"}}/>
  </div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div></div>
        <div className="container ">
        {
          foodCat !== [] ? 
            foodCat.map((data) => {
              return (
               <div className="row mb-3">
                 <div key={data._id} className="fs-3 m-3 text-light">
                  {data.CategoryName}
                 </div>
                 <hr/>
                {
                foodItem !== []
                ?
                foodItem .filter((item) => (
                item.CategoryName === data.CategoryName && item.name !== undefined && item.name.toLowerCase().includes(search.toLowerCase())
                ))
                .map(filterItems=>{
                    return(
                        <div key ={filterItems._id} className="col-12 col-md-6 col-lg-3">
                            <Cards foodItem = {filterItems}
                            options={filterItems.options && filterItems.options.length > 0 ? filterItems.options[0] : null}
                            imgSrc={filterItems.img}
                            ></Cards>
                        </div>
                    )
                
                }):<div>No Such Data Found</div>}
               </div>


            );
            }): ""
        }

        </div>
        <div><Footer /></div>
      </div>
    </>
  );
}

export default Home;

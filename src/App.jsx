import { useEffect, useState } from 'react'
import './App.css'
import {   Badge, Card, CardActionArea, CardActions, CardContent, CardMedia } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
const url="https://fakestoreapi.com/products";


function App() {
  
    const [products,setProducts]=useState([])
    const [cart,setcart]=useState([]);
    useEffect(()=>{
fetch(url,{
  method:"GET"
}) 
.then((res)=>res.json())
.then((data)=>setProducts(data))
.catch((err)=>{
  console.log(err);
});
    },[]);

    return (
      <div id="app"> 
       <NavBar cart={cart}/> 
        {/* ternary operator tru means exuting
       {show && <Timer/>}  
       <Button variant="contained" onClick={()=>setshow(!show)} >{show ? "Hide":"Show"}</Button>
        */}
       
       {products && (
         <div id="product-list">
           {products?.map((prod,idx)=>(
             <ProductCard products={prod} key={idx} cart={cart} setcart={setcart}/>
            )) }
         </div>
        )}


      </div>   
    );
  }
    


export default App;
  
  
// function Timer(){

//   const[count,setcount]=useState(0);
//   useEffect(()=>{
//     console.log("Mounted the component");
//     const interval=setInterval(() => {
//       console.log("updating");
//       setcount((prev)=>prev+1);
//     }, 1000);
//     return()=>{
//       console.log("unmounting");
//       clearInterval(interval);
//     };
//   },[]);
//   return<h1>Timer : {count}</h1>
// }

function ProductCard({products,cart,setcart}){
  const [showAdd,setshowAdd]=useState(true);
function handleAddCart(addproducts){
  setcart([...cart,addproducts]);
  setshowAdd(!showAdd);
}
function handleRemoveCart(id){
  let newCartData=cart.filter((prod)=>prod.id != id);
  setcart(newCartData);
  setshowAdd(!showAdd);
  
}
      return (
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              image={products?.image}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {products?.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {products?.description}
              </Typography>
              <Typography>
                Rs.{products?.price}
              </Typography>
              <Typography>
               Rating : {products?.rating?.rate}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
           { showAdd?(<Button onClick={()=>handleAddCart(products)}
            variant="contained" size="small" 
            color="primary">
              Add Cart
            </Button>):(<Button onClick={()=>handleRemoveCart(products.id)}
             variant="contained" size="small" color="error">
              Remove Cart
            </Button>)}
          </CardActions>
        </Card>
      );
    }

   



 function NavBar({cart}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ShopCart
          </Typography>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="add to shopping cart"
            sx={{ mr: 2 }}
          >
          
          <Badge badgeContent={cart?.length} color="error" >
          Cart
          </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
    

  

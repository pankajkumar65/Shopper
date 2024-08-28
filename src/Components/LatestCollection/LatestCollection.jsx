import React, { useContext } from "react";
import "./LatestCollection.css";
import { ShopContext } from "../../Context/ShopContext";
import dropdown_icon from "../../Components/Assets/Dropdown_icon.webp";
import Item from "../../Components/item/item";

// Helper function to check if a product is within the last 30 days
const isRecent = (date) => {
  const today = new Date();
  const productDate = new Date(date);
  const daysDifference = (today - productDate) / (1000 * 60 * 60 * 24);
  return daysDifference <= 30;
};

const LatestCollection = (props) => {
  const { products } = useContext(ShopContext);

  // Filter products to include only those added in the last 30 days
  const recentProducts = products.filter(item => isRecent(item.createdAt));

  return (
    <div className="latest-collection">
      <img className="latestCollection-banner" src={props.banner} alt="" />
      <div className="latestcollection-indexsort">
        <p>
          <span>Showing {recentProducts.length}</span> products
        </p>
        <div className="latestcollection-sort">
          <p>Sort by</p>
          <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="latestcollection-products">
        {recentProducts.map((item, i) => (
          <Item
            key={i}
            id={item.id}
            name={item.name}
            description={item.description}
            image={item.imageUrl}
            new_price={item.price}
            old_price={item.price}
          />
        ))}
      </div>
      <div className="latestcollection-loadmore">Explore More</div>
    </div>
  );
};

export default LatestCollection;

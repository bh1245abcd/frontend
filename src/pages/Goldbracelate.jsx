// import { useParams } from "react-router-dom";

// const Goldbracelate = () => {
//   const params = useParams();
//   console.log("PARAMS:", params);

//   return (
//     <div className="mt-32">
//       <h1 className="text-2xl font-bold ">Goldbracelate</h1>
//       <p>Category ID: {params.categoryId}</p>
//       <p>Subcategory ID: {params.subId}</p>
//     </div>
//   );
// };

// export default Goldbracelate;

import ProductGrid from "../reusable/productgrid";

const Goldbracelate = () => {
  return (
    <ProductGrid
      title="Bracelet Page"
    />
  );
};

export default Goldbracelate;

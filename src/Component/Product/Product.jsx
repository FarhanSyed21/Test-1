import { useState } from "react";

const Product = () => {
  const [id, setId] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [products, setProducts] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const handleClick = (e) => {
    e.preventDefault();
    if (!id || !price || !name) {
      alert("Please fill all the fields");
      return;
    }

    const newProduct = {
      id: id,
      price: parseFloat(price),
      name: name
    };

    localStorage.setItem(id, JSON.stringify(newProduct));

    setProducts([...products, newProduct]);
    setTotalValue((prevTotal) => prevTotal + parseFloat(price));

    setId("");
    setName("");
    setPrice("");
  };

  const handleDelete = (productId) => {
    const deletedProduct = products.find((product) => product.id === productId);
    if (deletedProduct) {
      setTotalValue((prevTotal) => prevTotal - deletedProduct.price);
      setProducts(products.filter((product) => product.id !== productId));
      localStorage.removeItem(productId);
    }
  };

  return (
    <div>
      <div className="productDetails">
        <label htmlFor="id">Product ID :</label>
        <input
          type="number"
          value={id}
          className="id"
          onChange={(e) => setId(e.target.value)}
        />
        <label htmlFor="price">Selling Price :</label>
        <input
          type="number"
          className="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="name">Product Name :</label>
        <input
          type="text"
          className="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" onClick={handleClick}>
          Add Product
        </button>
      </div>
      <div className="productList">
        <h1>Products</h1>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {`ID: ${product.id}, Price: ${product.price}, Name: ${product.name}`}
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <div className="productsTotal">
        <h1>{`Total Value Worth of Products: RS ${totalValue}`}</h1>
      </div>
    </div>
  );
};

export default Product;

import React from 'react';
import { connect } from 'dva';
import ProductList from '../components/ProductList';

const Products = ({ dispatch, products }) => {
  function handleDelete(id) {
    dispatch({
      type: 'products/delete',
      payload: id,
    });
  }
  return (
    <div>
      <h2>List of Products</h2>
      <ProductList onDelete={handleDelete} products={products} />
    </div>
  );
};

// export default Products;
/*
官方示例是function mapStateToProps(state, ownProps) {
return {
  users: state.users,
};
}
export default connect(mapStateToProps)(App);
然后在 App 里就有了 dispatch 和 users 两个属性。
*/
// 说明connect传进去的function第一个参数是state这个对象,
// 里面是在index.js初始化的state,这里可通过解构只return出去要用到的对象
export default connect(({ products }) => ({
  products,
}))(Products);

const cart = [
  { id: 1, name: "鍵盤", price: 1200, quantity: 1 },
  { id: 2, name: "滑鼠", price: 600, quantity: 2 },
  { id: 1, name: "鍵盤", price: 1200, quantity: 2 },
  { id: 3, name: "充電線", price: 200, quantity: 0 },
  { id: 2, name: "滑鼠", price: 600, quantity: 1 },
];

function mergeCartItems(cart) {
  // 去除數量為零的
  const filterCart = cart.filter((item) => item.quantity !== 0);
  // sort 後找
  const duplicateFilterCart = [ ...filterCart ].sort((a, b) => a.id - b.id);
  // 合併 id 相同的
  const mergeCartItems = [];
  const test = filterCart.find((item) => item.id === item.id);
  console.log(test); // { id: 1, name: '鍵盤', price: 1200, quantity: 1 }
};

mergeCartItems(cart);
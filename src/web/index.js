import dva from 'dva';
import './index.css';
import './index.html';

// 1. Initialize
const app = dva({
  initialState: {
    products: [
      { name: 'dva', id: 1 },
      { name: 'antd', id: 2 },
    ],
  },
  onError(e) {
    console.log(e.message);
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/products'));
app.model(require('./models/registration.js'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

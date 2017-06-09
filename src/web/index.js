import dva from 'dva';
import './index.css';
import './index.html';

// 1. Initialize
const app = dva({
  initialState: {
  },
  onError(e) {
    console.log(e.message);
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/registration.js'));
app.model(require('./models/menu.js'));
app.model(require('./models/user.js'));
app.model(require('./models/roleSetting.js'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

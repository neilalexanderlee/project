import dva from 'dva';
import './index.css';
import './index.html';
import * as models from './models';

// 1. Initialize
const initialState = {};
for (const model of Object.keys(models)) {
  initialState[models[model].namespace] = models[model].state;
}

const undo = r => (state, action) => {
  const newState = r(state, action);
  if (action.type === 'user/logout') {
    return {
      routing: newState.routing,
      ...initialState,
    };
  } else {
    return newState;
  }
};
const app = dva({
  initialState: {
  },
  onError(e) {
    console.log(e.message);
  },
  onReducer: undo,
});

// 2. Plugins
// app.use({});

// 3. Model
for (const model of Object.keys(models)) {
  app.model(models[model]);
}

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');

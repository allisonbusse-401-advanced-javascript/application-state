import { createStore } from 'redux';

const initialState = {
  coffees: 0,
  snacks: 0,
  naps: 0,
  studies: 0,
  face: '',
  actions: [],
  render: false,
  time: 0

};

function reducer(state = initialState, action) {
  switch(action.type) {
    case 'DRINK_COFFEE':
      return { ...state, coffees: state.coffees + 1 };
    case 'EAT_SNACK':
      return { ...state, snacks: state.snacks + 1 };
    case 'TAKE_NAP':
      return { ...state, naps: state.naps + 1 };
    case 'STUDY':
      return { ...state, studies: state.studies + 1 };
    case 'START_BUTTON':
      return { ...state, render: true, time: 10 };
    case 'DECREMENT_TIMER':
      return { ...state, time: state.time - 1 };
    case 'TIMEOUT':
      return {
        coffees: 0,
        snacks: 0,
        naps: 0,
        studies: 0,
        render: false,
        count: 10
      };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;


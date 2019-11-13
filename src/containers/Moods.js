import React from 'react';
import PropTypes from 'prop-types';
import Controls from '../components/controls/Controls';
import Face from '../components/face/Face';
import { connect } from 'react-redux';
import Timer from '../components/timer/Timer';
import styles from './Moods.css';


const actions = [
  { name: 'DRINK_COFFEE', text: 'Drink Coffee', stateName: 'coffees' },
  { name: 'EAT_SNACK', text: 'Snack', stateName: 'snacks' },
  { name: 'TAKE_NAP', text: 'Nap', stateName: 'naps' },
  { name: 'STUDY', text: 'Study', stateName: 'studies' },
];



export const isTired = state => state.coffees < 1 && state.naps < 1;
export const isHyper = state => state.coffees > 3;
export const isEducated = state => state.studies > 2;
export const isHungry = state => state.snacks < 1;

export const getFace = state => {
  if(isTired(state) && isHungry(state)) return '🤬';
  if(isHyper(state) && isHungry(state)) return '🤮';
  if(isTired(state)) return '😴';
  if(isHyper(state)) return '🙀';
  if(isEducated(state)) return '🤯';
  if(isHungry(state)) return '😡';

  return '😀';
};



const Moods = ({ count, face, actions, render, time, handleSelection, handleClick, startTimer, handleTimeout }) => {
  const mappedActions = actions.map(action => ({
    ...action,
    count: count[action.stateName]
  }));

  if(time === 0) handleTimeout();


  return (
    <div className={styles.Moods}>
      {render ? (
        <>
          <Controls actions={mappedActions} handleSelection={handleSelection} />
          <Timer time={time} startTimer={startTimer} />
          <Face emoji={face} />
        </>
      ) : (
        <button onClick={handleClick}>Start</button>
      )}
    </div>
  );
};

Moods.propTypes = {
  count: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  face: PropTypes.string.isRequired,
  actions: PropTypes.array.isRequired,
  render: PropTypes.bool.isRequired,
  time: PropTypes.number.isRequired,
  handleSelection: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  startTimer: PropTypes.func.isRequired,
  handleTimeout: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  count: {
    coffees: state.coffees,
    snacks: state.snacks,
    naps: state.naps,
    studies: state.studies,
  },
  face: getFace(state),
  actions: actions,
  render: state.render,
  time: state.time
});

const mapDispatchToProps = dispatch => ({
  handleSelection(name) {
    dispatch({
      type: name
    });
  },
  handleClick() {
    dispatch({
      type: 'START_BUTTON'
    });
  },
  startTimer() {
    dispatch({
      type: 'DECREMENT_TIMER'
    });
  },
  handleTimeout() {
    dispatch({
      type: 'TIMEOUT'
    });
  }

});

const MoodsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Moods);

export default MoodsContainer;

// export default class Moods extends Component {
//   // state = {
//   //   coffees: 0,
//   //   snacks: 0,
//   //   naps: 0,
//   //   studies: 0
//   // }

//   handleSelection = name => {
//     switch(name) {
//       case 'DRINK_COFFEE':
//         this.setState(state => ({ coffees: state.coffees + 1 }));
//         break;
//       case 'EAT_SNACK':
//         this.setState(state => ({ snacks: state.snacks + 1 }));
//         break;
//       case 'TAKE_NAP':
//         this.setState(state => ({ naps: state.naps + 1 }));
//         break;
//       case 'STUDY':
//         this.setState(state => ({ studies: state.studies + 1 }));
//         break;
//       default:
//         console.log(`unhandled name: ${name}`);
//     }
//   }

//   render() {
//     const face = getFace(this.state);


//     // return (
//     //   <>
//     //     <Controls actions={controlActions} handleSelection={this.handleSelection}/>
//     //     <Face emoji={face} />
//     //   </>
//     // );
//   }
// }

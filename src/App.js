import React, { useState } from 'react';
import './App.css';
import './Stylesheets/Navbar.css';
import './Stylesheets/Trainer.css';
import './Stylesheets/Vocabset.css';
import Trainer from './Javascript/Trainer';
import Vocabset from './Javascript/Vocabset';
import Settings from './Javascript/Settings';
import Credits from './Javascript/Credits';

export default function App() {
  const [state, setState] = useState({
    trainer: false,
    vocab: true,
    settings: false,
    data: false
  });

  const Icon = (props) => {
    return (
      <span className="material-symbols-rounded" style={{ fontSize: '4vh', color: props.color }} >{props.icon}</span>
    );
  }

  const Interface = () => {
    const Navbar = () => {
      function renderComponent(component) {
        setState((prevState) => ({
          ...prevState,
          trainer: false,
          vocab: false,
          settings: false,
          data: false,
          [component]: true
        }));
      }

      return (
        <>
          <div className="Navbar">
            <h1>
              Navi <Icon icon="near_me" />
            </h1>
            <ul>
              <li><button onClick={() => renderComponent('trainer')}>Trainer <Icon icon="school" /></button></li>
              <li><button onClick={() => renderComponent('vocab')}>Vocab <Icon icon="task" /></button></li>
              <li><button onClick={() => renderComponent('settings')}>Settings <Icon icon="settings" /></button></li>
              <li><button onClick={() => renderComponent('data')}>Data <Icon icon="info" /></button></li>
            </ul>
          </div>
        </>
      );
    }

    return (
      <>
        <Navbar />
        <div className="renderArea">
          {state.trainer && <Trainer />}
          {state.vocab && <Vocabset />}
          {state.settings && <Settings />}
          {state.data && <Credits />}
        </div>
      </>
    );
  }

  return (
    <div className="App">
      <Interface />
    </div>
  );
}

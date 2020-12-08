import React from 'react';
import { useLocalStore, useObserver } from 'mobx-react';

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalStore(() => ({
    bugs: ['Centipede'],
    addBug: (bug) => {
      store.bugs.push(bug);
    },
    get bugsCount() {
      return store.bugs.length;
    },
  }));

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

const BugsHeader = () => {
  const store = React.useContext(StoreContext);
  return useObserver(() => <h1>{store.bugsCount} Bugs!</h1>);
};

const BugsList = () => {
  const store = React.useContext(StoreContext);

  return useObserver(() => (
    <ul>
      {store.bugs.map((bug) => (
        <li key={bug}>{bug}</li>
      ))}
    </ul>
  ));
};

const BugsForm = () => {
  const store = React.useContext(StoreContext);
  const [bug, setBug] = React.useState('');

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        store.addBug(bug);
        setBug('');
      }}
    >
      <input
        type='text'
        value={bug}
        onChange={(e) => {
          setBug(e.target.value);
        }}
      />
    </form>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <div>
        <BugsHeader />
        <BugsList />
        <BugsForm />
      </div>
    </StoreProvider>
  );
}

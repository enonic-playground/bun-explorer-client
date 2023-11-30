import './styles/App.sass';

import { GraphQLClient, ClientContext } from 'graphql-hooks'
import { Page } from './components/Page';

const API_KEY = 'biler';

const client = new GraphQLClient({
  fetchOptions: {
    credentials: 'include',
    headers: {
      authorization: `Explorer-Api-Key ${API_KEY}` // mode must be cors otherwise this header is not sent
    },
    mode: 'cors',
  },
  logErrors: true,
  url: 'http://localhost:8080/webapp/com.enonic.app.explorer/api/graphql',
});

function App() {
  return (
    <ClientContext.Provider value={client}>
      <Page/>
    </ClientContext.Provider>
  );
}

export default App;

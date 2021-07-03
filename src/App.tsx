import { Grid } from './components';
import data from './data.json';

const App: React.FC = () => {
  console.log(data[0]);
  return (
    <div className="tw-m-auto md:tw-max-w-4xl tw-p-8 tw-m-8">
      <h1 className="tw-my-8 tw-">Word finder</h1>
      <Grid characters={data[0].character_grid.flat()} />
    </div>
  );
};

export default App;

import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';
import { Drivstoff } from './Drivstoff';
import { Modell } from './Modell';
import { usePageState } from '../hooks/usePageState';

export function Page() {
    const {
        data,
        drivstoffValues, setDrivstoffValues,
        loading,
        modelMin, setModelMin,
        modelMax, setModelMax,
        onFormSubmit,
        onInputChange,
        placeholder,
        q,
        searchString,
      } = usePageState();
      return (
          <div className="search">
            <SearchForm
              disabled={loading}
              onFormSubmit={onFormSubmit}
              onInputChange={onInputChange}
              placeholder={placeholder}
              q={q}
            />
            {
              !searchString ? null : <p>searchString: {searchString}</p>
            }
            {
              !data?.interface?.search?.total ? null
                : <p>total: {data?.interface?.search?.total}</p>
            }
            <div className='container'>
              <aside>
                <Modell
                  min={modelMin}
                  max={modelMax}
                  setModelMin={setModelMin}
                  setModelMax={setModelMax}
                />
                <Drivstoff
                  drivstoffValues={drivstoffValues}
                  setDrivstoffValues={setDrivstoffValues}
                />
              </aside>
              <section>
                <SearchResults
                  data={data}
                  loading={loading}
                />
              </section>
            </div>
            
          </div>
      );
}
import { Best } from './Best';
import { Drivstoff } from './Drivstoff';
import { Modell } from './Modell';
import { Pagination } from './Pagination';
import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';
import { Sort } from './Sort';
import { usePageState } from '../hooks/usePageState';


export function Page() {
    const {
        best, setBest, setBestValue,
        data,
        drivstoffValues, setDrivstoffValues,
        loading,
        modelMin, setModelMin,
        modelMax, setModelMax,
        onFormSubmit,
        onInputChange,
        perPage, setPerPage,
        placeholder,
        q,
        searchString,
        start, setStart,
        firstOnPage, lastOnPage, total,
        sortField, setSortField
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
                <Best
                  best={best}
                  setBest={setBest}
                  setBestValue={setBestValue}
                  data={data}
                />
                <Sort
                  sortField={sortField}
                  setSortField={setSortField}
                />
              </aside>
              <section>
                {
                  !total ? null
                    : <p>Viser treff {firstOnPage} til {lastOnPage} av totalt {total} treff</p>
                }
                <SearchResults
                  data={data}
                  loading={loading}
                />
              </section>
              <aside>
                <Pagination
                    data={data}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    start={start}
                    setStart={setStart}
                  />
              </aside>
            </div>
          </div>
      );
}
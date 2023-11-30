import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';
import { Modell } from './Modell';
import { usePageState } from '../hooks/usePageState';

export function Page() {
    const {
        // currentPage,
        data,
        // dimPagination,
        // dimSearchResults,
        // filterHeadingText,
        // headingText,
        // hint,
        loading,
        modelMin, setModelMin,
        modelMax, setModelMax,
        // mainQueryRes,
        // noHitsText,
        onFormSubmit,
        onInputChange,
        // pages,
        placeholder,
        q,
        // sanitizedIntroHtmlReplaced,
        searchString,
        // smartFetch,
        // sourceBuckets
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
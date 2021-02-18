// The results section of the page which displays a list of results

import ResultCard from './ResultCard';

function Results(props) {
  return (
    <div className="pt-12 px-48 flex flex-col">
      <div className="flex justify-between flex-wrap -mx-4">
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
      </div>
      <div className="text-center py-7">
        <button className="bg-blue-600 text-white font-light text-xs rounded-full py-4 px-10">
          Show More
        </button>
      </div>
    </div>
  );
}

export default Results;

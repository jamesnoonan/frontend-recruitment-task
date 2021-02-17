// The results section of the page which displays a list of results

import ResultCard from './ResultCard';

function Results(props) {
  return (
    <div className="pt-16 px-48 flex flex-col">
      <div className="flex justify-between flex-wrap">
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
        <ResultCard />
      </div>
      <div className="text-center py-8">
        <button className="bg-blue-600 text-white font-light text-sm rounded-full py-4 px-10">
          Show More
        </button>
      </div>
    </div>
  );
}

export default Results;

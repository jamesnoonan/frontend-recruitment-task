// Filter results to match with search term and filters

function filterResults(properties, filters) {
  let filtered = [...properties];

  // Filter to only results that have the search term
  if (filters.hasOwnProperty('searchTerm')) {
    filtered = filtered.filter(
      (property) =>
        property.title
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) ||
        property.address
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
    );
  }

  // Filter to results that match discrete filters
  ['baths', 'beds', 'type', 'status'].forEach((discreteFilter) => {
    if (
      filters.hasOwnProperty(discreteFilter) &&
      filters[discreteFilter] !== 'none'
    ) {
      filtered = filtered.filter(
        (property) =>
          property[discreteFilter].toString().toLowerCase() ===
          filters[discreteFilter].toString().toLowerCase()
      );
    }
  });

  // Filter to results that are within the ranges
  ['price', 'size'].forEach((rangeFilter) => {
    if (filters.hasOwnProperty(rangeFilter)) {
      filtered = filtered.filter(
        (property) =>
          property[rangeFilter] >= filters[rangeFilter].min &&
          property[rangeFilter] <= filters[rangeFilter].max
      );
    }
  });

  // Sort the results by the specified order
  if (filters.hasOwnProperty('orderBy') && filters.orderBy !== 'none') {
    if (typeof properties[0][filters.orderBy] === 'number') {
      filtered = filtered.sort(
        (a, b) => a[filters.orderBy] - b[filters.orderBy]
      );
    } else {
      filtered = filtered.sort((a, b) =>
        a[filters.orderBy].localeCompare(b[filters.orderBy])
      );
    }
  }

  return filtered;
}

export default filterResults;

import './FilterInput.scss';

interface FilterInputProps {
  placeholder?: string,
  search: string,
  // eslint-disable-next-line no-unused-vars
  setSearch: (value: string) => void
}

function FilterInput({ placeholder, search, setSearch } : FilterInputProps) {
  return (
    <input
      className="search-input"
      placeholder={placeholder}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

FilterInput.defaultProps = {
  placeholder: '',
};

export default FilterInput;

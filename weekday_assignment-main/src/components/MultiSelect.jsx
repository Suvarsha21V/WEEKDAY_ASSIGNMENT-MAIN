import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import { useState } from "react";

const MultiSelect = ({ options, name, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (event, value) => {
    console.log(event.target.value);
    setSelectedOptions(value);
    onChange(value);
  };

  return (
    <Autocomplete
      multiple
      id="tags-outlined"
      options={options}
      size="small"
      value={selectedOptions}
      onChange={handleSelectChange}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField {...params} label={name} placeholder={name} />
      )}
    />
  );
};

MultiSelect.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default MultiSelect;

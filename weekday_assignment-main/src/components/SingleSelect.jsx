import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useState } from "react";
import PropTypes from "prop-types";

const SingleSelect = ({ options, name, onChange }) => {
  const [selected, setSelected] = useState("");

  // Function to handle the change in the select component
  const handleChange = (event) => {
    const value = event.target.value;
    setSelected(value);
    onChange(value);
  };

  return (
    <FormControl sx={{ width: 300 }} size="small">
      <InputLabel
        id="name"
        style={{
          width: "100%",
        }}
      >
        {name}
      </InputLabel>
      <Select
        labelId="name"
        id="name"
        value={selected}
        size="small"
        label={name}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

SingleSelect.propTypes = {
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

export default SingleSelect;

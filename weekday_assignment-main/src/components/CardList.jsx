import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import Card from "./Card";

const CardList = ({ data }) => {
  return (
    <Grid container lg={20} padding={2} spacing={2}>
      {data.map((card, id) => (
        <Grid item lg={4} xs={120} sm={6} key={id}>
          <Card data={card} />
        </Grid>
      ))}
    </Grid>
  );
};

CardList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default CardList;

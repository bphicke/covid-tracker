import React, { FunctionComponent } from "react";
import { CircularProgress, Grid } from "@material-ui/core";

type Props = {
  loading: boolean;
};

export const Loading: FunctionComponent<Props> = ({ loading, children }) => {
  if (loading)
    return (
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        style={{ minHeight: "70vh" }}
      >
        <CircularProgress />
      </Grid>
    );

  return <>{children}</>;
};

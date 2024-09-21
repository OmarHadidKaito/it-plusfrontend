import type { FC } from "react";
import { Container } from "@mui/material";
import { GeoForm } from "src/sections/Geo";

const GeoPage: FC = () => {
  return (
    <Container maxWidth="lg">
      <GeoForm />
    </Container>
  );
};
export default GeoPage;

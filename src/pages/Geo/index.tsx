import type { FC } from "react";
import { Container } from "@mui/material";
import { GeoForm } from "src/sections/Geo";
import { ChangeLanguage } from "src/components/lang";

const GeoPage: FC = () => {
  return (
    <Container maxWidth="lg">
      <ChangeLanguage />
      <GeoForm />
    </Container>
  );
};
export default GeoPage;

import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { Container, Button, Box } from "@mui/material";

export const ChangeLanguage: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Container>
      <Box sx={{ my: 4, display: "flex", justifyContent: "center", gap: 2 }}>
        <Button variant="contained" onClick={() => changeLanguage("en")}>
          English
        </Button>
        <Button variant="contained" onClick={() => changeLanguage("nl")}>
          Dutch
        </Button>
      </Box>
    </Container>
  );
};

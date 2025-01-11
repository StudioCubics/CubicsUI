"use client";

import supportedLangs from "@/library/constants/supportedLangs";
import formatDate from "@/library/functions/formatDate";
import { Library } from "@/library/types/Library";
import {
  CalendarTodayRounded,
  UpdateRounded,
  WarningRounded,
} from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

export default function LibraryCard({
  library,
  ...rest
}: {
  library: Partial<Library>;
} & ButtonProps) {
  const theme = useTheme();
  const supportedLang = supportedLangs.find((sl) => sl.name == library.lang);

  const LangLogo = supportedLang ? supportedLang.Logo : WarningRounded;
  const formattedDates = {
    created: formatDate(library.created),
    updated: formatDate(library.updated),
  };

  return (
    <Button
      {...rest}
      variant="outlined"
      sx={{
        px: 6,
        py: 2,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        borderColor: "var(--palette-divider)",
      }}
    >
      <Stack
        alignItems={"flex-start"}
        gap={2}
      >
        <Typography
          fontWeight={"bold"}
          color="textPrimary"
        >
          {library.name}
        </Typography>

        {formattedDates.created == formattedDates.updated ? (
          <Tooltip title={`Created on ${formattedDates.created}`}>
            <Typography
              variant="body2"
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              <CalendarTodayRounded fontSize="inherit" />
              {formattedDates.created}
            </Typography>
          </Tooltip>
        ) : (
          <Tooltip title={`Modified on ${formattedDates.updated}`}>
            <Typography
              variant="body2"
              display={"flex"}
              alignItems={"center"}
              gap={1}
            >
              <UpdateRounded fontSize="inherit" />
              {formattedDates.updated}
            </Typography>
          </Tooltip>
        )}
      </Stack>
      <Stack color={"text.secondary"}>
        <LangLogo />
      </Stack>
    </Button>
  );
}

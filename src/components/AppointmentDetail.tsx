import React from "react";
import { Stack, Typography, Divider } from "@mui/material";
import { convertFromMilitaryTime } from "utils/utilFuncs";
import { ApiDataObject } from "utils/types";

interface Prop {
  detail: ApiDataObject;
}
/**
 * This component displays the appointment details
 * @params  detail - the props it takes
 */
function AppointmentDetail({ detail }: Prop) {
  return (
    <Stack spacing={2} sx={{ pt: 2, pb: 2 }}>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Typography variant="h6">Title:</Typography>
        <Typography variant="caption">{detail.title}</Typography>
      </Stack>

      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <img
          alt="profile_img"
          src={detail.clientImg}
          width={30}
          height="30"
          style={{
            borderRadius: "50%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
        <Typography variant="caption" sx={{}}>
          {detail.clientName}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Appointment With:
        </Typography>
        <img
          alt="profile_img"
          src={detail.appointmentWithImg}
          width={30}
          height="30"
          style={{
            borderRadius: "50%",
            objectFit: "contain",
            objectPosition: "center",
          }}
        />
        <Typography variant="caption">{detail.appointmentWith}</Typography>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Time:
        </Typography>

        <Typography variant="caption" sx={{}}>
          {`${convertFromMilitaryTime(
            detail?.startTime
          )} - ${convertFromMilitaryTime(detail?.endTime)}`}
        </Typography>
      </Stack>
    </Stack>
  );
}

export default AppointmentDetail;

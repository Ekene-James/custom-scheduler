import { Paper, Stack, Typography } from "@mui/material";
import CustomModal from "components/CustomModal";

import {
  findAppointmentDayAndTime,
  getAppointmentCellHeight,
  randomBorderTopColor,
} from "utils/utilFuncs";
import React from "react";
import { ApiDataObject, RefType, TimeType } from "utils/types";
import AppointmentDetail from "components/AppointmentDetail";
interface Props {
  weekDay: Date;
  time: TimeType;
  apiData: ApiDataObject[];
}
/**
 * Cell component of the Weekly view
 * @description
 * Use @function findAppointmentDayAndTime (apiData, weekDay, time) to find
 * The schedules for that day and their various times,
 * Note that they could be more than 1, so loop and display all appointments
 * with clients image and name,
 * Do same for modal contents
 *
 * @param Props
 * @returns Jsx Element
 */

const Cell = ({ weekDay, time, apiData }: Props) => {
  const modalRef = React.useRef<RefType>(null);
  const cellDay = findAppointmentDayAndTime(apiData, weekDay, time);

  const toggleModal = () => {
    modalRef?.current?.handleToggle();
  };

  return (
    <>
      {cellDay.length ? (
        <React.Fragment>
          <Paper
            id={`Week_cell_component_for_${weekDay}_${time.militaryTime}`}
            sx={{
              zIndex: 10,
              position: "absolute",
              height: getAppointmentCellHeight(cellDay[0]),

              width: "100%",

              marginBottom: "2px",
              borderRadius: "5px",
              border: "1px solid rgba(0,0,0,0.3)",
              borderTop: `5px solid ${randomBorderTopColor()}`,
              top: 0,
              left: 0,
              cursor: "pointer",
              boxShadow: "0px 4px 33px rgba(0, 0, 0, 0.09) !important",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              paddingTop: "4px",
            }}
            onClick={toggleModal}
          >
            <Stack
              direction={"column"}
              spacing={0.5}
              sx={{ maxHeight: "85%", overflowY: "auto" }}
            >
              <Typography
                variant="subtitle2"
                fontWeight={"bold"}
                fontSize={{ xs: "0.68rem", md: "0.9rem" }}
              >
                Appointments
              </Typography>
              {cellDay.map((dayDetails) => (
                <Stack
                  key={dayDetails.title}
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                >
                  <img
                    alt="profile_img"
                    src={dayDetails.clientImg}
                    width={15}
                    height="15"
                    style={{
                      borderRadius: "50%",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                  />

                  <Typography
                    variant="subtitle2"
                    sx={{
                      width: "85%",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                    fontSize={{ xs: "0.6rem", md: "0.8rem" }}
                  >
                    {dayDetails.clientName}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
          <CustomModal
            ref={modalRef}
            childrenContSx={{
              p: 3,
              pt: 5,
              height: "fit-content !important",
              width: { xs: "100%", md: "40vw !important" },
            }}
            ariaLabel="week-view-cell"
          >
            <>
              {cellDay.map((dayDetails, i) => (
                <Stack key={dayDetails.title} direction="column" spacing={1}>
                  <AppointmentDetail detail={dayDetails} />
                </Stack>
              ))}
            </>
          </CustomModal>
        </React.Fragment>
      ) : null}
    </>
  );
};

export default Cell;

import { Paper, Stack, Typography } from "@mui/material";
import CustomModal from "components/CustomModal";

import { findDayInMonth, randomBorderTopColor } from "utils/utilFuncs";
import React from "react";
import { ApiDataObject, RefType } from "utils/types";
import { cellHeight } from "../../utils/staticData";
import AppointmentDetail from "components/AppointmentDetail";

interface Props {
  weekDay: Date;
  apiData: Array<ApiDataObject>;
}

/**
 * 
 * The cell componet of the monthly view
 * @description
 * Used to display a scheduler for a particular day in a month,
 * Used @function findDayInMonth to get the schedule that matches that day of the month, Note: they can be more than 1,
 * Loop through them and display the names and pictures of those that has appointment,
    Do so for the modal contents
 * @param Props 
 * @returns jsx Element
 */

const CellComponent = ({ weekDay, apiData }: Props): JSX.Element => {
  const modalRef = React.useRef<RefType>(null);
  const cellDays = findDayInMonth(apiData, weekDay);

  const toggleModal = (): void => {
    modalRef?.current?.handleToggle();
  };

  return (
    <>
      {cellDays.length ? (
        <React.Fragment>
          <Paper
            id={`Month_cell_component_for_${weekDay}`}
            sx={{
              zIndex: 10,

              height: cellHeight - 20,
              width: "auto",

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
              <Typography variant="caption" fontWeight={"bold"}>
                Appointments
              </Typography>
              {cellDays.map((dayDetails, i) => (
                <Stack
                  key={i}
                  direction="row"
                  spacing={0.5}
                  alignItems="center"
                >
                  <img
                    alt="profile_img"
                    src={
                      dayDetails?.clientImg || "/imgs/blank-profile-picture.png"
                    }
                    width={15}
                    height="15"
                    style={{
                      borderRadius: "50%",
                      objectFit: "contain",
                      objectPosition: "center",
                    }}
                  />

                  <Typography
                    variant="caption"
                    sx={{
                      width: "85%",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    {dayDetails?.clientName}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Paper>
          <CustomModal
            ref={modalRef}
            childrenContSx={{
              p: 3,
              pt: 4,
              height: "fit-content !important",
              width: "40vw !important",
            }}
            ariaLabel="month_view_modal"
          >
            <>
              {cellDays.map((dayDetails, i) => (
                <Stack key={i} direction="column" spacing={1}>
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

export default CellComponent;

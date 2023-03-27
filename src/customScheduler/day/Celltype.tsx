import { Paper } from "@mui/material";
import CustomModal from "components/CustomModal";
import {
  findDateTime,
  getCellWidth,
  randomBorderTopColor,
} from "utils/utilFuncs";
import React from "react";
import { ApiDataObject, RefType } from "utils/types";
import Stack from "@mui/material/Stack";
import AppointmentDetail from "components/AppointmentDetail";

interface Props {
  interval: number;
  shifts: ApiDataObject[];
}

/**
 * The Cell component for the day view.
 * @description
 * Each cell has a time interval attached to it called interval,
 * Check to find the api data with such interval, Note they could be more than 1,
 * Loop through the matched data, and display names,
 * Do same for modal content to display all in a list fashion
 *
 * @param Props
 * @returns Jsx Element
 */
const CellType = ({ interval, shifts }: Props): JSX.Element => {
  const modalRef = React.useRef<RefType>(null);
  let currentShift: ApiDataObject[] = [];
  currentShift = findDateTime(interval, shifts);

  const toggleModal = () => {
    modalRef?.current?.handleToggle();
  };

  return (
    <>
      {currentShift.length ? (
        <>
          <React.Fragment>
            <Paper
              sx={{
                zIndex: 10,
                position: "absolute",
                width: getCellWidth(currentShift),
                height: "100%",

                borderRadius: "3px",
                border: "1px solid rgba(0,0,0,0.3)",
                borderLeft: `5px solid ${randomBorderTopColor()}`,
                top: 0,
                left: 0,
                cursor: "pointer",
                boxShadow: "0px 4px 33px rgba(0, 0, 0, 0.09) !important",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
              onClick={toggleModal}
            >
              {currentShift.map(
                (shift, i, arr) =>
                  `${shift?.clientName}${i === arr.length - 1 ? "" : ","} `
              )}
            </Paper>
          </React.Fragment>

          <CustomModal
            ref={modalRef}
            childrenContSx={{
              p: 3,
              height: "fit-content !important",
              width: "40vw",
            }}
            ariaLabel="day_modal"
          >
            <>
              {currentShift.map((dayDetails, i) => (
                <Stack key={dayDetails.title} direction="column" spacing={1}>
                  <AppointmentDetail detail={dayDetails} />
                </Stack>
              ))}
            </>
          </CustomModal>
        </>
      ) : null}
    </>
  );
};

export default CellType;

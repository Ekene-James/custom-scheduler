import React, { forwardRef, Ref, useImperativeHandle } from "react";
import Backdrop from "@mui/material/Backdrop";
import { Box, IconButton, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { RefType } from "utils/types";

interface Props {
  children: JSX.Element;
  /** Css object that would be spread to be used to style the direct parent of the children prop */
  childrenContSx?: object;
  ariaLabel: string;

  /** A function that runs after modal closes, like resetting states */
  cleanUp?(): void;
}

/**
 * Custom Modal component where modal refs are passed,
 * functions are now bubbled down instead of up using useImperativeHandle
 * example of such functions here is
 * handleToggle function
 *
 */
const CustomModal = forwardRef(function Modal(props: Props, ref: Ref<RefType>) {
  const {
    children,
    childrenContSx,
    ariaLabel = "modal",
    cleanUp = () => {},
  } = props;
  const [open, setOpen] = React.useState<boolean>(false);
  const handleClose = () => {
    cleanUp();
    setOpen(false);
  };
  const handleToggle = (): void => {
    setOpen(!open);
  };
  useImperativeHandle(ref, () => {
    return {
      handleToggle,
    };
  });
  return (
    <Backdrop
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      aria-label={ariaLabel}
    >
      <Box sx={{ maxWidth: "90%", maxHeight: "95%", overflowY: "auto" }}>
        <Paper
          sx={{
            p: 2,
            width: "auto",
            minHeight: "40%",
            margin: "auto",
            minWidth: {
              xs: "90%",
              sm: "30%",
            },

            position: "relative",
            ...childrenContSx,
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: "absolute",
              top: "1%",
              right: "2%",
            }}
          >
            <CloseIcon />
          </IconButton>

          {children}
        </Paper>
      </Box>
    </Backdrop>
  );
});

export default CustomModal;

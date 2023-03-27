import * as React from "react";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box } from "@mui/material";
import { MenuItemType } from "utils/types";

interface Props {
  caption: string;
  items: MenuItemType[];
  /**
   * Fnction triggered when an item in the menu is clicked
   * @param MenuItemType
   * @returns void
   */
  onClickItem: (item: MenuItemType) => void;
}
/**
 * Custom Menu that takes an array of MenuItemType objects,
 * When an item is clicked, the onClickItem function is called, also when a tab or escape key is pressed, the menu item tray is closed
 *
 * @param Props interface
 */
export default function CustomMenu({
  caption,
  items = [],
  onClickItem,
}: Props) {
  const [open, setOpen] = React.useState<boolean>(false);
  const anchorRef = React.useRef<any>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent> | MouseEvent | TouchEvent
  ): void => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleClickItem = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>,
    itemClicked: MenuItemType
  ) => {
    onClickItem(itemClicked);
    handleClose(e);
  };

  function handleListKeyDown(event: React.KeyboardEvent<HTMLUListElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box>
      <Button
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          border: "1px solid rgba(132, 132, 132, 0.15)",
        }}
      >
        {caption}
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement={"bottom-start"}
        transition
        disablePortal
        sx={{
          zIndex: "100000",
          width: {
            xs: "24%",
            sm: "9.5%",
          },
        }}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper
              sx={{
                border: "1px solid rgba(132, 132, 132, 0.15)",
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {items.map((item, i) => (
                    <MenuItem
                      key={item.name}
                      onClick={(e) => handleClickItem(e, item)}
                      sx={{ pr: 0.5, width: "100%" }}
                    >
                      {item.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}

import React from "react";
import { Paper, Stack } from "@mui/material";
import Scheduler from "customScheduler/Scheduler";
import { apiData } from "utils/dummyData";
import DatePicker from "components/DatePicker";
import CustomMenu from "components/CustomMenu";
import { MenuItemType } from "utils/types";
import "./App.css";
const items: MenuItemType[] = [
  {
    name: "Day",
    value: "Day",
  },
  {
    name: "Week",
    value: "Week",
  },
  {
    name: "Month",
    value: "Month",
  },
];
function App() {
  const [scheduleDate, setscheduleDate] = React.useState<Date>(new Date());
  const [view, setview] = React.useState<MenuItemType>({
    name: "Week",
    value: "Week",
  });
  const onClickItem = (item: MenuItemType): void => {
    setview(item);
  };
  return (
    <Paper sx={{ padding: 2, minWidth: 500, width: "100%", overflow: "auto" }}>
      <Stack spacing={2}>
        <Stack
          direction={"row"}
          alignItems="center"
          justifyContent={"space-between"}
          width="100%"
        >
          <CustomMenu
            caption={view.name}
            onClickItem={onClickItem}
            items={items}
          />
          <DatePicker
            name="scheduleDate"
            handleOnchange={(e) => setscheduleDate(new Date(e.target.value))}
            value={scheduleDate}
          />
        </Stack>
        <Scheduler
          view={view.name}
          apiData={apiData}
          currentDay={scheduleDate}
        />
      </Stack>
    </Paper>
  );
}

export default App;

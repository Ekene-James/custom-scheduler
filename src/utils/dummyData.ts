// Date format is : MM:DD:YY
let today = new Date();

export const apiData = [
  {
    id: 1,
    title: "Things Fall Apart",
    startDate: today,
    endDate: today,
    startTime: "7:00",
    endTime: "8:45",
    clientImg:
      "/imgs/dog-golden-retriever-jumping-autumn-leaves-autumnal-sunlight-77861618.jpg",
    clientName: "Ajuri Alaka",
    appointmentWith: "Dr.Samie Ejor",
    appointmentWithId: "dc-1",
    appointmentWithImg: "/imgs/images (1).jpg",
  },
  {
    id: 2,
    title: "Half of a Yellow Sun",
    startDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() + 1 > 30 ? 30 : today.getDate() + 1
      }/${today.getFullYear()}`
    ),
    endDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() + 1 > 30 ? 30 : today.getDate() + 1
      }/${today.getFullYear()}`
    ),
    startTime: "8:00",
    endTime: "10:00",
    clientImg: "/imgs/images.jpg",
    clientName: "Janet Dope",
    appointmentWith: "Dr.Justin Land",
    appointmentWithId: "dc-2",
    appointmentWithImg: "/imgs/istockphoto-1067347086-612x612.jpg",
  },
  {
    id: 3,
    title: "Purple Hibiscus",
    startDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() + 1 > 30 ? 30 : today.getDate() + 1
      }/${today.getFullYear()}`
    ),
    endDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() + 1 > 30 ? 30 : today.getDate() + 1
      }/${today.getFullYear()}`
    ),
    startTime: "8:00",
    endTime: "10:00",
    clientImg: "/imgs/istockphoto-1191962502-612x612.jpg",
    clientName: "Jon Doe",
    appointmentWith: "Dr.Janet Jolls",
    appointmentWithId: "dc-3",
    appointmentWithImg:
      "/imgs/two-cute-golden-retriever-puppies-playing-photo-45116795.jpg",
  },
  {
    id: 4,
    title: "There was a country",
    startDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() + 2 > 30 ? 30 : today.getDate() + 2
      }/${today.getFullYear()}`
    ),
    endDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() + 2 > 30 ? 30 : today.getDate() + 2
      }/${today.getFullYear()}`
    ),
    startTime: "9:00",
    endTime: "10:30",
    clientImg: "/imgs/istockphoto-1191962502-612x612.jpg",
    clientName: "Asa Nwa",
    appointmentWith: "Dr.Samie Ejor",
    appointmentWithId: "dc-1",
    appointmentWithImg: "/imgs/images (1).jpg",
  },
  {
    id: 5,
    title: "The thing around your neck",
    startDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() + 3 > 30 ? 30 : today.getDate() + 3
      }/${today.getFullYear()}`
    ),
    endDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() + 3 > 30 ? 30 : today.getDate() + 3
      }/${today.getFullYear()}`
    ),
    startTime: "10:00",
    endTime: "13:30",
    clientImg: "/imgs/istockphoto-1191962502-612x612.jpg",
    clientName: "Abdul Jo",
    appointmentWith: "Dr.Samie Ejor",
    appointmentWithId: "dc-1",
    appointmentWithImg: "/imgs/images (1).jpg",
  },
  {
    id: 6,
    title: "Battle of the two bastards",
    startDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() + 3 > 30 ? 30 : today.getDate() + 3
      }/${today.getFullYear()}`
    ),
    endDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() + 3 > 30 ? 30 : today.getDate() + 3
      }/${today.getFullYear()}`
    ),
    startTime: "10:00",
    endTime: "13:30",
    clientImg: "/imgs/istockphoto-1191962502-612x612.jpg",
    clientName: "Josh Tina",
    appointmentWith: "Dr.Janet Jolls",
    appointmentWithId: "dc-2",
    appointmentWithImg: "/imgs/images (1).jpg",
  },
  {
    id: 7,
    title: "Song of ice & fire",
    startDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() - 2 < 1 ? 2 : today.getDate() - 2
      }/${today.getFullYear()}`
    ),
    endDate: new Date(
      `${today.getMonth() + 1}/${
        today.getDate() - 2 < 1 ? 2 : today.getDate() - 2
      }/${today.getFullYear()}`
    ),
    startTime: "8:00",
    endTime: "10:00",
    clientImg: "/imgs/images.jpg",
    clientName: "Em D’Arcy",
    appointmentWith: "Dr.Justin Land",
    appointmentWithId: "dc-2",
    appointmentWithImg: "/imgs/istockphoto-1067347086-612x612.jpg",
  },
  {
    id: 8,
    title: "Breaking Bad",
    startDate: today,
    endDate: today,
    startTime: "7:00",
    endTime: "8:45",
    clientImg: "/imgs/images.jpg",
    clientName: "Jes Pman",
    appointmentWith: "Dr. Ginger Ibeneme",
    appointmentWithId: "dc-13",
    appointmentWithImg: "/imgs/istockphoto-1067347086-612x612.jpg",
  },
];

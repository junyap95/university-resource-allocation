export const STATUS_PENDING = "PENDING";
export const STATUS_APPROVED = "APPROVED";
export const STATUS_FAILED = "FAILED";
export const START_TIME_GREEDY = "START_TIME_GREEDY";
export const LONGEST_DURATION_GREEDY = "LONGEST_DURATION_GREEDY";
export const RANDOM_ASSIGNMENT = "RANDOM_ASSIGNMENT";
export const BACKTRACKING = "BACKTRACKING";
export const INTEGER_PROGRAMMING = "INTEGER_PROGRAMMING";

export const SUCCESS_MESSAGE = {
  sqlOperation: true,
  sqlMessage: "Booking Inserted Into Database!",
};

export const DUPLICATE_ENTRY_MESSAGE = {
  sqlOperation: false,
  sqlMessage: "Duplicate Entry Found, Booking Not Inserted!",
};

export const MOCK_REQUESTS = {
  allRequests: [
    {
      request_id: "Zy2HH8-GiFap",
      client_id: "JSP5d4HLhc",
      start_date: "2024-10-8",
      start_time: "08:30:00",
      end_time: "10:00:00",
      capacity: "80",
      booking_status: "PENDING",
    },
    {
      request_id: "5FKt8dghicHO",
      client_id: "JSP5d4HLhc",
      start_date: "2024-10-8",
      start_time: "08:30:00",
      end_time: "10:00:00",
      capacity: "80",
      booking_status: "PENDING",
    },
    {
      request_id: "Fur8R3RpGKLZ",
      client_id: "EJAW1HEO-k",
      start_date: "2024-08-16",
      start_time: "18:00:00",
      end_time: "21:00:00",
      capacity: "95",
      booking_status: "PENDING",
    },
    {
      request_id: "qie1Wu_9tRoN",
      client_id: "HJ602F6cML",
      start_date: "2024-08-16",
      start_time: "11:00:00",
      end_time: "15:30:00",
      capacity: "70",
      booking_status: "PENDING",
    },
  ],
  allClients: [
    {
      client_id: "AAARgiFr_G",
      first_name: "Armin",
      last_name: "Arlert",
      phone_num: "0129432890432",
      email_address: "armin_a@gmail.com",
    },
    {
      client_id: "ALTR77BD9o",
      first_name: "Annie",
      last_name: "Leonhart",
      phone_num: "01234547834",
      email_address: "annie_lh@gmail.com",
    },
    {
      client_id: "CSkwbNL0OV",
      first_name: "Connie",
      last_name: "Springer",
      phone_num: "45378945378",
      email_address: "connie_springer@gmail.com",
    },
  ],
  allHalls: [
    {
      hall_id: "1",
      hall_name: "Ecruteak",
      hall_size: 100,
    },
    {
      hall_id: "2",
      hall_name: "Blackthorn",
      hall_size: 70,
    },
    {
      hall_id: "3",
      hall_name: "Mahogany",
      hall_size: 50,
    },
  ],
};

export const MOCK_RESULTS_TIME = {
  allocatedRequests: [
    {
      request_id: "Zy2HH8-GiFap",
      client_id: "JSP5d4HLhc",
      start_time: "08:30:00",
      end_time: "10:00:00",
      capacity: "80",
      hall_assigned: "1",
      space_utilised: "80/100",
      profit: 150,
    },
  ],
  failedRequests: [
    {
      request_id: "5FKt8dghicHO",
      client_id: "JSP5d4HLhc",
      start_date: "2024-10-8",
      start_time: "08:30:00",
      end_time: "10:00:00",
      capacity: "80",
    },
  ],
  totalProfit: 150,
};

export const MOCK_REQUESTS_FOR_CHECKING = {
  bookingRequest: [
    {
      alloc_hall: "Ecruteak",
      booking_status: "APPROVED",
      capacity: "70",
      client_id: "JSP5d4HLhc",
      client_name: "John Smith",
      end_time: "17:00:00",
      request_id: "4UDPCeTgk0o9",
      start_date: "2024-10-08",
      start_time: "13:00:00",
    },
    {
      booking_status: "FAILED",
      capacity: "80",
      client_id: "JSP5d4HLhc",
      client_name: "John Smith",
      end_time: "10:00:00",
      request_id: "5FKt8dghicHO",
      start_date: "2024-10-08",
      start_time: "08:30:00",
    },
  ],
};

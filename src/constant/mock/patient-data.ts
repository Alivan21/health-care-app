import { PatientTableTypes, PatientTypes } from "../types/patient";

export const PatientTableMockData: PatientTableTypes[] = [
  {
    date: "6/22/2024",
    reason: "Lorem ipsum...",
    referralFrom: "Dr. Jhon Doe",
    referralTo: "Dr. Jhon Doe",
    specialty: "Cardiology",
    startDate: "6/22/2024",
    endDate: "6/22/2024",
    priority: "STAT",
  },
  {
    date: "6/22/2024",
    reason: "Lorem ipsum...",
    referralFrom: "Dr. Jhon Doe",
    referralTo: "Dr. Jhon Doe",
    specialty: "Cardiology",
    startDate: "6/22/2024",
    endDate: "6/22/2024",
    priority: "Urgent",
  },
  {
    date: "6/22/2024",
    reason: "Lorem ipsum...",
    referralFrom: "Dr. Jhon Doe",
    referralTo: "Dr. Jhon Doe",
    specialty: "Cardiology",
    startDate: "6/22/2024",
    endDate: "6/22/2024",
    priority: "Routine",
  },
  {
    date: "6/22/2024",
    reason: "Lorem ipsum...",
    referralFrom: "Dr. Jhon Doe",
    referralTo: "Dr. Jhon Doe",
    specialty: "Cardiology",
    startDate: "6/22/2024",
    endDate: "6/22/2024",
    priority: "Routine",
  },
  {
    date: "6/22/2024",
    reason: "Lorem ipsum...",
    referralFrom: "Dr. Jhon Doe",
    referralTo: "Dr. Jhon Doe",
    specialty: "Cardiology",
    startDate: "6/22/2024",
    endDate: "6/22/2024",
    priority: "STAT",
  },
];

export const PatientMockData: PatientTypes[] = [
  {
    id: "MRN-001",
    name: "Jerome Bellingham",
    gender: "Male",
    birthdate: new Date("2001-05-03"),
    phone_number: "+62 812 2367 7364",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
  {
    id: "MRN-002",
    name: "Sophia Carter",
    gender: "Female",
    birthdate: new Date("1998-12-15"),
    phone_number: "+62 811 5432 1234",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
  {
    id: "MRN-003",
    name: "Ethan Rivera",
    gender: "Male",
    birthdate: new Date("1985-06-24"),
    phone_number: "+62 813 4567 8901",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
  {
    id: "MRN-004",
    name: "Mia Johnson",
    gender: "Female",
    birthdate: new Date("1992-03-12"),
    phone_number: "+62 815 6789 4321",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
  {
    id: "MRN-005",
    name: "William Harris",
    gender: "Male",
    birthdate: new Date("1979-11-08"),
    phone_number: "+62 819 3456 7890",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
  {
    id: "MRN-006",
    name: "Olivia Brown",
    gender: "Female",
    birthdate: new Date("1987-09-27"),
    phone_number: "+62 816 2345 6789",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
  {
    id: "MRN-007",
    name: "James White",
    gender: "Male",
    birthdate: new Date("1995-02-14"),
    phone_number: "+62 817 9876 5432",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
  {
    id: "MRN-008",
    name: "Amelia Davis",
    gender: "Female",
    birthdate: new Date("2003-07-18"),
    phone_number: "+62 818 4567 3210",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
  {
    id: "MRN-009",
    name: "Benjamin Martin",
    gender: "Male",
    birthdate: new Date("2000-04-05"),
    phone_number: "+62 814 1234 5678",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
  {
    id: "MRN-010",
    name: "Isabella Garcia",
    gender: "Female",
    birthdate: new Date("1990-01-01"),
    phone_number: "+62 810 9876 2103",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
  {
    id: "MRN-011",
    name: "Liam Wilson",
    gender: "Male",
    birthdate: new Date("1982-08-10"),
    phone_number: "+62 822 3456 7891",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
  {
    id: "MRN-012",
    name: "Emma Thompson",
    gender: "Female",
    birthdate: new Date("1999-06-22"),
    phone_number: "+62 823 1234 5679",
    policy_number: "UH-12986237812",
    inscurance_provider: "United Health Care",
    documents_history: [
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
      {
        document_url: "/documents/mock-patient-document.pdf",
        document_name: "Mock Patient Document",
      },
    ],
  },
];

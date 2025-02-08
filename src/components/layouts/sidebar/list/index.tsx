import { MenuSection } from "@/components/layouts/sidebar";
import { MedicalCardMockData } from "@/constant/mock/medical-card";
import { convertToSlug } from "@/lib/utils";
import {
  BarChart3,
  CircleHelp,
  LayoutDashboard,
  MessageSquareMore,
  Network,
  Share2,
  Users,
  BriefcaseMedical,
} from "lucide-react";

export const SidebarMenuList: MenuSection[] = [
  {
    label: "GENERAL",
    items: [
      {
        title: "Dashboard",
        icon: <LayoutDashboard className="size-4" />,
        href: "/",
      },
      {
        title: "Referrals",
        icon: <Share2 className="size-4" />,
        href: "/referrals",
        badge: 3,
        child: [
          {
            title: "Speciality Affiliation",
            child: [
              {
                title: "Partner Network",
                href: "/referrals/speciality-affiliation/partner-network",
              },
              {
                title: "Preferred Specialities",
                href: "/referrals/preferred-specialities",
              },
            ],
          },
          {
            title: "Type",
            child: [
              {
                title: "Referral Requests",
                href: "/referrals/type/referral-requests",
              },
              {
                title: "Prior Authorization Requests",
                href: "/referrals/type/par",
              },
            ],
          },
          {
            title: "Priority",
            child: [
              {
                title: "STAT",
                href: "/referrals/priority/stat",
              },
              {
                title: "Urgent",
                href: "/referrals/priority/urgent",
              },
              {
                title: "Routine",
                href: "/referrals/priority/routine",
              },
            ],
          },
          {
            title: "Speciality",
            child: [
              {
                title: "Cardiology",
                href: "/referrals/speciality/cardiology",
              },
              {
                title: "Orthopedics",
                href: "/referrals/speciality/orthopedics",
              },
              {
                title: "Pulomonology",
                href: "/referrals/speciality/pulmonology",
              },
              {
                title: "Endocrinology",
                href: "/referrals/speciality/endocrinology",
              },
              {
                title: "Others",
                href: "/referrals/speciality/others",
              },
            ],
          },
          {
            title: "Primary Care Provider",
            child: MedicalCardMockData.slice(4, 8).map(data => ({
              title: `Dr. ${data.name}`,
              href: `/referrals/pcp/${convertToSlug(data.name)}`,
            })),
          },
        ],
      },
      {
        title: "Patients",
        icon: <Users className="size-4" />,
        href: "/patients",
      },
      {
        title: "Provider Network",
        icon: <BriefcaseMedical className="size-4" />,
        href: "/provider-network",
      },
      {
        title: "Workflow",
        icon: <Network className="size-4" />,
        href: "/workflow",
      },
      {
        title: "Analytics",
        icon: <BarChart3 className="size-4" />,
        href: "/analytics",
      },
    ],
  },
  {
    label: "OTHER",
    items: [
      {
        title: "Chat & Support",
        icon: <MessageSquareMore className="size-4" />,
        href: "/chat",
      },
      {
        title: "Help Center",
        icon: <CircleHelp className="size-4" />,
        href: "/help",
      },
    ],
  },
];

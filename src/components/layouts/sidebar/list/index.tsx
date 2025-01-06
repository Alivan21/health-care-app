import { MenuSection } from "@/components/layouts/sidebar";
import {
  BarChart3,
  CircleHelp,
  FileSpreadsheet,
  LayoutDashboard,
  MessageSquareMore,
  Network,
  Share2,
  Users,
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
        badge: 12,
        child: [
          {
            title: 'Speciality Affiliation',
            child: [
              {
                title: 'Partner Network',
                href: '/referrals/speciality-affiliation',
              },
              {
                title: 'Preferred Specialities',
                href: '/referrals/preferred-specialities',
              }
            ]
          },
          {
            title: 'Type',
            child: [
              {
                title: 'Partner Network',
                href: '/referrals/speciality-affiliation',
              },
              {
                title: 'Preferred Specialities',
                href: '/referrals/preferred-specialities',
              }
            ]
          },
          {
            title: 'Priority',
            child: [
              {
                title: 'STAT',
                href: '/referrals/priority/stat',
              },
              {
                title: 'Urgent',
                href: '/referrals/priority/urgent',
              },
              {
                title: 'Routine',
                href: '/referrals/priority/routine'
              },
              {
                title: 'SUCCESS',
                href: '/referrals/priority/success'
              }
            ]
          },
          {
            title: 'Categorization',
            child: [
              {
                title: 'Partner Network',
                href: '/referrals/speciality-affiliation',
              },
              {
                title: 'Preferred Specialities',
                href: '/referrals/preferred-specialities',
              }
            ]
          },
          {
            title: 'Primary Care Provider',
            child: [
              {
                title: 'Partner Network',
                href: '/referrals/speciality-affiliation',
              },
              {
                title: 'Preferred Specialities',
                href: '/referrals/preferred-specialities',
              }
            ]
          }
        ]
      },
      {
        title: "Patients",
        icon: <Users className="size-4" />,
        href: "/patients",
      },
      {
        title: "Analytics",
        icon: <BarChart3 className="size-4" />,
        href: "/analytics",
      },
      {
        title: "Reports",
        icon: <FileSpreadsheet className="size-4" />,
        href: "/reports",
      },
      {
        title: "Network",
        icon: <Network className="size-4" />,
        href: "/network",
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

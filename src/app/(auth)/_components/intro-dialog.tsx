import type React from "react";

import { useState } from "react";
import { FileText, Layout, Heart } from "lucide-react";
import Link from "next/link";

interface TourSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  actionHref: string;
}

const tourSections: TourSection[] = [
  {
    id: "referral",
    icon: <FileText className="size-8 text-blue-600" />,
    title: "Submit your first referral",
    description: "Lorem ipsum dolor sit amet consectetur. Nibh feugiat vitae at hendrerit",
    action: "Try it now",
    actionHref: "/referrals",
  },
  {
    id: "tour",
    icon: <Layout className="size-8 text-blue-600" />,
    title: "Making a tour",
    description: "Lorem ipsum dolor sit amet consectetur. Nibh feugiat vitae at hendrerit",
    action: "Explore Features",
    actionHref: "/",
  },
  {
    id: "emr",
    icon: <Heart className="size-8 text-blue-600" />,
    title: "Set up EMR Channel",
    description: "Lorem ipsum dolor sit amet consectetur. Nibh feugiat vitae at hendrerit",
    action: "Configure your EHR",
    actionHref: "/login",
  },
];

export default function IntroDialog() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  return (
    <div>
      <div className="space-y-8 pt-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-semibold tracking-tight">
            Start Your Journey with a
            <br />
            Guided Tour Experience
          </h2>
          <p className="text-muted-foreground">
            Explore the essential features step by step and make the most out of your experience
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {tourSections.map(section => (
            <div
              className="relative space-y-4 text-center"
              key={section.id}
              onMouseEnter={() => setHoveredSection(section.id)}
              onMouseLeave={() => setHoveredSection(null)}
            >
              <div className="flex justify-center">{section.icon}</div>
              <div
                className={`absolute inset-x-0 bottom-36 h-0.5 transition-colors duration-200 ${
                  hoveredSection === section.id ? "bg-blue-600" : "bg-gray-200"
                }`}
              />
              <div className="space-y-2">
                <h3 className="font-medium">{section.title}</h3>
                <p className="text-sm text-muted-foreground">{section.description}</p>
              </div>
              <div className="pt-2">
                <Link
                  className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                  href={section.actionHref}
                >
                  {section.action} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

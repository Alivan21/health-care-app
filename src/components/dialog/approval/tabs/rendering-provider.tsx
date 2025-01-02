"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Provider {
  id: string;
  name: string;
  specialty: string;
  availableDate: string;
  insuranceAccepted: boolean;
  location: {
    address: string;
    distance: string;
  };
  imageUrl: string;
}

const providers: Provider[] = [
  {
    id: "1",
    name: "Dr. Marie Curie",
    specialty: "Cardiologist",
    availableDate: "Dec 05, 2024",
    insuranceAccepted: true,
    location: {
      address: "321 Maple Avenue, Jacksonville, Florida 32256",
      distance: "6.2 mi",
    },
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Dr. Richard Bennett",
    specialty: "General Practitioner",
    availableDate: "Dec 07, 2024",
    insuranceAccepted: true,
    location: {
      address: "789 Pine Street, Orlando, Florida 32801",
      distance: "4.2 mi",
    },
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Dr. Nathaniel Brooks",
    specialty: "Pediatrician",
    availableDate: "Dec 10, 2024",
    insuranceAccepted: true,
    location: {
      address: "456 Oak Lane, Tampa, Florida 33607",
      distance: "2.2 mi",
    },
    imageUrl: "/placeholder.svg?height=40&width=40",
  },
];

export default function RenderingProviderSelect() {
  const [search, setSearch] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");

  const filteredProviders = providers.filter(
    provider =>
      provider.name.toLowerCase().includes(search.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Rendering Provider</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            className="pl-8"
            onChange={e => setSearch(e.target.value)}
            placeholder="Search"
            type="search"
            value={search}
          />
        </div>
      </div>

      <RadioGroup
        className="space-y-2"
        onValueChange={setSelectedProvider}
        value={selectedProvider}
      >
        <div className="grid grid-cols-4 rounded-lg bg-secondary px-4 py-2 text-center text-sm font-medium text-muted-foreground">
          <div>Name</div>
          <div>Periods Availability</div>
          <div>Insurance</div>
          <div>Location</div>
        </div>
        {filteredProviders.map(provider => (
          <Label
            className="flex cursor-pointer items-center space-x-4 rounded-lg border p-2 hover:bg-muted [&:has(:checked)]:bg-muted"
            key={provider.id}
          >
            <RadioGroupItem value={provider.id} />
            <div className="grid flex-1 grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <Image
                  alt={provider.name}
                  className="size-10 rounded-full bg-muted"
                  height={40}
                  src={provider.imageUrl}
                  width={40}
                />
                <div>
                  <div className="font-medium">{provider.name}</div>
                  <div className="text-sm text-muted-foreground">{provider.specialty}</div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-sm">{provider.availableDate}</div>
              </div>
              <div className="flex items-center">
                {!!provider.insuranceAccepted && (
                  <span className="text-sm text-green-600">Insurance Accepted</span>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-sm">{provider.location.address}</div>
                <div className="text-sm text-muted-foreground">{provider.location.distance}</div>
              </div>
            </div>
          </Label>
        ))}
      </RadioGroup>
    </div>
  );
}

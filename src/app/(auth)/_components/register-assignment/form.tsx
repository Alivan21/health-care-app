import Autocomplete from "@/components/autocomplete";
import { FileUploader } from "@/components/file-uploader";
import FormProvider from "@/components/hook-form-provider";
import CustomFormInput from "@/components/input/custom-form-input";
import CustomFormSelect from "@/components/select/custom-form-select";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import taxonomyData from "@/constant/mock/taxonomy-data.json";
import { StepFormProps } from "@/constant/types/general";
import { UserAssignemtSchema, UserAssignmentSchemaType } from "@/schema/assignment";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm, useFormContext } from "react-hook-form";
import RegisterAssignmentFormStepper from "./stepper";

export default function RegisterAssignmentForm({
  setIsDialogOpen,
  setIsSuccessDialogOpen,
}: {
  setIsDialogOpen: (value: boolean) => void;
  setIsSuccessDialogOpen: (value: boolean) => void;
}) {
  const [step, setStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);

  const methods = useForm<UserAssignmentSchemaType>({
    resolver: zodResolver(UserAssignemtSchema),
    reValidateMode: "onChange",
    defaultValues: {
      organization_name: "",
      organization_type: "",
      organization_npi: "",
      organization_taxid: "",
      organization_taxonomy: "",
      payers_region: "",
      organization_address: "",
      organization_suite: "",
      organization_zipcode: "",
      organization_city: "",
      organization_state: "",
      organization_phone: "",
      organization_fax: "",
      organization_member: [{ member_email: "", member_role: "" }],
    },
  });

  const {
    watch,
    formState: { errors },
  } = methods;

  const onSubmit = (data: UserAssignmentSchemaType) => {
    console.log("Final Submission:", data);
    setIsDialogOpen(false);
    setIsSuccessDialogOpen(true);
  };

  const handleNext = async (e: React.MouseEvent) => {
    e.preventDefault();
    const fieldsToValidate: (keyof UserAssignmentSchemaType)[] =
      step === 0
        ? [
            "organization_name",
            "organization_type",
            "organization_npi",
            "organization_taxonomy",
            "payers_region",
          ]
        : [
            "organization_address",
            "organization_suite",
            "organization_zipcode",
            "organization_city",
            "organization_state",
            "organization_phone",
          ];

    const isValid = await methods.trigger(fieldsToValidate);

    if (isValid) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const stepOneFields = watch([
    "organization_name",
    "organization_type",
    "organization_npi",
    "organization_taxonomy",
    "payers_region",
  ]);

  const stepTwoFields = watch([
    "organization_address",
    "organization_suite",
    "organization_zipcode",
    "organization_city",
    "organization_state",
    "organization_phone",
  ]);

  const isStepValid =
    step === 0
      ? stepOneFields.every(field => field && field.trim() !== "")
      : stepTwoFields
          .filter((_, index) => index !== 1)
          .every(field => field && field.trim() !== "");

  return (
    <div className="flex size-full justify-between">
      <div className="flex w-full flex-col items-center px-2 py-12">
        <h1 className="mb-5 text-center text-2xl font-medium">
          {step > 1 ? "Invite Your Team" : "Organization Information"}
        </h1>
        {step > 1 ? (
          <p className="text-sm font-normal">Register and use our services now</p>
        ) : (
          <div className="flex items-center">
            <RegisterAssignmentFormStepper step={step} totalStep={2} />
          </div>
        )}
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <ScrollArea className="h-[550px] w-full overflow-y-auto p-2">
            <div className="mt-9 flex w-full flex-col space-y-4 px-4">
              {step === 0 && <StepOne errors={errors} />}
              {step === 1 && <StepTwo errors={errors} />}
              {step === 2 && (
                <InviteTeamMemberForm
                  errors={errors}
                  setUploadedFiles={setFiles}
                  uploadedFiles={files}
                />
              )}
            </div>

            {step !== 3 && (
              <div className="mt-6 flex w-full flex-col space-y-4 px-4">
                {step < 2 ? (
                  <Button
                    className="!w-full rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
                    disabled={!isStepValid}
                    onClick={e => {
                      handleNext(e).catch(err => {
                        console.error("Error in handleNext:", err);
                        throw new Error(err instanceof Error ? err.message : String(err));
                      });
                    }}
                    type="button"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    className="!w-full rounded bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
                    type="submit"
                  >
                    Submit
                  </Button>
                )}
                {step > 0 && (
                  <Button
                    className="!w-full rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-400"
                    onClick={prevStep}
                    type="button"
                  >
                    Back
                  </Button>
                )}
                {step === 2 && (
                  <Button className="w-full" type="submit" variant="link">
                    Skip
                  </Button>
                )}
              </div>
            )}
          </ScrollArea>
        </FormProvider>
      </div>
      <div className="flex size-full">
        <Image
          alt="Assignment Illustration"
          height={700}
          src="/img/assignment_illustration.svg"
          width={390}
        />
      </div>
    </div>
  );
}

export function StepOne({ errors }: StepFormProps) {
  const { control } = useFormContext();
  const taxonomyStringData = taxonomyData;

  const regions = [
    { label: "Northeast", value: "northeast" },
    { label: "Southeast", value: "southeast" },
    { label: "Midwest", value: "midwest" },
    { label: "Southwest", value: "southwest" },
    { label: "West", value: "west" },
    { label: "Pacific Northwest", value: "pacific_northwest" },
    { label: "Great Plains", value: "great_plains" },
    { label: "Rocky Mountains", value: "rocky_mountains" },
    { label: "Deep South", value: "deep_south" },
    { label: "Appalachia", value: "appalachia" },
    { label: "New England", value: "new_england" },
    { label: "Mid-Atlantic", value: "mid_atlantic" },
    { label: "Florida Peninsula", value: "florida_peninsula" },
    { label: "Texas Hill Country", value: "texas_hill_country" },
    { label: "Ozarks", value: "ozarks" },
    { label: "Great Basin", value: "great_basin" },
    { label: "California Central Valley", value: "california_central_valley" },
    { label: "Alaska Interior", value: "alaska_interior" },
    { label: "Hawaii Islands", value: "hawaii_islands" },
    { label: "Mississippi Delta", value: "mississippi_delta" },
  ];

  return (
    <>
      <CustomFormInput
        error={errors.organization_name?.message}
        label="Organization Name"
        name="organization_name"
        placeholder="Enter organization name"
      />
      <CustomFormSelect
        error={errors.organization_type?.message}
        label="Organization Type"
        name="organization_type"
        options={[
          { value: "service_provider", label: "Heath Service Provider" },
          { value: "healthcare", label: "Heathcare Provider" },
        ]}
      />
      <CustomFormInput
        error={errors.organization_npi?.message}
        label="Organization NPI"
        name="organization_npi"
        placeholder="Enter NPI"
      />
      <Controller
        control={control}
        name="organization_taxonomy"
        render={({ field }) => (
          <div className="relative w-full">
            <Autocomplete
              {...field}
              error={errors.organization_taxonomy?.message}
              label="Organization Taxonomy"
              options={taxonomyStringData.providerTaxonomies}
            />
          </div>
        )}
      />
      <CustomFormInput
        error={errors.organization_zipcode?.message}
        label="Organization Tax ID"
        name="organization_taxid"
        placeholder="Enter organization Tax ID"
      />
      <CustomFormSelect
        className="h-56"
        error={errors.payers_region?.message}
        label="Payers Region"
        name="payers_region"
        options={regions}
      />
    </>
  );
}

export function StepTwo({ errors }: StepFormProps) {
  const { control } = useFormContext();

  const addresses = [
    { label: "4439 Gale St, Livermore, CA 94550", value: "4439 Gale St, Livermore, CA 94550" },
    { label: "125 Maple Ave, Boston, MA 02108", value: "125 Maple Ave, Boston, MA 02108" },
    { label: "902 Cedar Dr, Austin, TX 78701", value: "902 Cedar Dr, Austin, TX 78701" },
    { label: "331 Oak St, Denver, CO 80203", value: "331 Oak St, Denver, CO 80203" },
    { label: "554 Pine St, Seattle, WA 98101", value: "554 Pine St, Seattle, WA 98101" },
    { label: "77 Birch Rd, Miami, FL 33101", value: "77 Birch Rd, Miami, FL 33101" },
    { label: "621 Spruce Ln, Chicago, IL 60601", value: "621 Spruce Ln, Chicago, IL 60601" },
    { label: "990 Willow Blvd, Dallas, TX 75201", value: "990 Willow Blvd, Dallas, TX 75201" },
    { label: "128 Redwood Ct, Phoenix, AZ 85001", value: "128 Redwood Ct, Phoenix, AZ 85001" },
    { label: "341 Aspen Way, San Diego, CA 92101", value: "341 Aspen Way, San Diego, CA 92101" },
    { label: "222 Chestnut St, Atlanta, GA 30301", value: "222 Chestnut St, Atlanta, GA 30301" },
    { label: "815 Palm Ave, Orlando, FL 32801", value: "815 Palm Ave, Orlando, FL 32801" },
    { label: "457 Magnolia St, Portland, OR 97201", value: "457 Magnolia St, Portland, OR 97201" },
    {
      label: "731 Sycamore Cir, New York, NY 10001",
      value: "731 Sycamore Cir, New York, NY 10001",
    },
    {
      label: "872 Hickory St, Philadelphia, PA 19101",
      value: "872 Hickory St, Philadelphia, PA 19101",
    },
    { label: "643 Dogwood Ln, Las Vegas, NV 89101", value: "643 Dogwood Ln, Las Vegas, NV 89101" },
    { label: "333 Elmwood Dr, San Jose, CA 95101", value: "333 Elmwood Dr, San Jose, CA 95101" },
    { label: "502 Poplar St, Nashville, TN 37201", value: "502 Poplar St, Nashville, TN 37201" },
    { label: "125 Bayberry Ct, Houston, TX 77001", value: "125 Bayberry Ct, Houston, TX 77001" },
    { label: "99 Cypress Ln, Charlotte, NC 28201", value: "99 Cypress Ln, Charlotte, NC 28201" },
    { label: "711 Fern Ave, Columbus, OH 43201", value: "711 Fern Ave, Columbus, OH 43201" },
    { label: "814 Beech St, Detroit, MI 48201", value: "814 Beech St, Detroit, MI 48201" },
    { label: "990 Ivy Dr, Indianapolis, IN 46201", value: "990 Ivy Dr, Indianapolis, IN 46201" },
    { label: "403 Acorn Rd, Minneapolis, MN 55401", value: "403 Acorn Rd, Minneapolis, MN 55401" },
    { label: "622 Olive St, St. Louis, MO 63101", value: "622 Olive St, St. Louis, MO 63101" },
    {
      label: "781 Walnut Ct, Kansas City, MO 64101",
      value: "781 Walnut Ct, Kansas City, MO 64101",
    },
    { label: "332 Marigold Ln, Memphis, TN 38101", value: "332 Marigold Ln, Memphis, TN 38101" },
    { label: "445 Rosewood Dr, Raleigh, NC 27601", value: "445 Rosewood Dr, Raleigh, NC 27601" },
    { label: "277 Juniper Ave, Tampa, FL 33601", value: "277 Juniper Ave, Tampa, FL 33601" },
    {
      label: "198 Violet St, Oklahoma City, OK 73101",
      value: "198 Violet St, Oklahoma City, OK 73101",
    },
  ];

  const cities = [
    { label: "Livermore, CA", value: "Livermore, CA" },
    { label: "Boston, MA", value: "Boston, MA" },
    { label: "Austin, TX", value: "Austin, TX" },
    { label: "Denver, CO", value: "Denver, CO" },
    { label: "Seattle, WA", value: "Seattle, WA" },
    { label: "Miami, FL", value: "Miami, FL" },
    { label: "Chicago, IL", value: "Chicago, IL" },
    { label: "Dallas, TX", value: "Dallas, TX" },
    { label: "Phoenix, AZ", value: "Phoenix, AZ" },
    { label: "San Diego, CA", value: "San Diego, CA" },
    { label: "Atlanta, GA", value: "Atlanta, GA" },
    { label: "Orlando, FL", value: "Orlando, FL" },
    { label: "Portland, OR", value: "Portland, OR" },
    { label: "New York, NY", value: "New York, NY" },
    { label: "Philadelphia, PA", value: "Philadelphia, PA" },
    { label: "Las Vegas, NV", value: "Las Vegas, NV" },
    { label: "San Jose, CA", value: "San Jose, CA" },
    { label: "Nashville, TN", value: "Nashville, TN" },
    { label: "Houston, TX", value: "Houston, TX" },
    { label: "Charlotte, NC", value: "Charlotte, NC" },
    { label: "Columbus, OH", value: "Columbus, OH" },
    { label: "Detroit, MI", value: "Detroit, MI" },
    { label: "Indianapolis, IN", value: "Indianapolis, IN" },
    { label: "Minneapolis, MN", value: "Minneapolis, MN" },
    { label: "St. Louis, MO", value: "St. Louis, MO" },
    { label: "Kansas City, MO", value: "Kansas City, MO" },
    { label: "Memphis, TN", value: "Memphis, TN" },
    { label: "Raleigh, NC", value: "Raleigh, NC" },
    { label: "Tampa, FL", value: "Tampa, FL" },
    { label: "Oklahoma City, OK", value: "Oklahoma City, OK" },
  ];

  const states = [
    { label: "California (CA)", value: "CA" },
    { label: "Massachusetts (MA)", value: "MA" },
    { label: "Texas (TX)", value: "TX" },
    { label: "Colorado (CO)", value: "CO" },
    { label: "Washington (WA)", value: "WA" },
    { label: "Florida (FL)", value: "FL" },
    { label: "Illinois (IL)", value: "IL" },
    { label: "Arizona (AZ)", value: "AZ" },
    { label: "Georgia (GA)", value: "GA" },
    { label: "Oregon (OR)", value: "OR" },
    { label: "New York (NY)", value: "NY" },
    { label: "Pennsylvania (PA)", value: "PA" },
    { label: "Nevada (NV)", value: "NV" },
    { label: "Tennessee (TN)", value: "TN" },
    { label: "North Carolina (NC)", value: "NC" },
    { label: "Ohio (OH)", value: "OH" },
    { label: "Michigan (MI)", value: "MI" },
    { label: "Indiana (IN)", value: "IN" },
    { label: "Minnesota (MN)", value: "MN" },
    { label: "Missouri (MO)", value: "MO" },
    { label: "Oklahoma (OK)", value: "OK" },
  ];

  return (
    <>
      <Controller
        control={control}
        name="organization_address"
        render={({ field }) => (
          <div className="relative w-full">
            <Autocomplete
              {...field}
              error={errors.organization_address?.message}
              label="Street Address"
              options={addresses}
            />
          </div>
        )}
      />
      <CustomFormInput
        error={errors.organization_suite?.message}
        label="Suite, Unit, Floor"
        name="organization_suite"
        placeholder="Enter organization suite"
      />
      <CustomFormInput
        error={errors.organization_zipcode?.message}
        label="Zipcode"
        name="organization_zipcode"
        placeholder="Enter organization zipcode"
      />
      <div className="flex w-full items-center space-x-3">
        <CustomFormSelect
          className="h-56"
          error={errors.organization_city?.message}
          label="City"
          name="organization_city"
          options={cities}
        />
        <CustomFormSelect
          className="h-56"
          error={errors.organization_state?.message}
          label="State"
          name="organization_state"
          options={states}
        />
      </div>
      <CustomFormInput
        error={errors.organization_phone?.message}
        label="Phone Number"
        name="organization_phone"
        placeholder="Enter organization phone"
      />
      <CustomFormInput
        error={errors.organization_phone?.message}
        label="Fax Number"
        name="organization_fax"
        placeholder="Enter organization fax"
      />
    </>
  );
}

export function InviteTeamMemberForm({
  errors,
  setUploadedFiles,
  uploadedFiles,
}: StepFormProps & { setUploadedFiles: (files: File[]) => void; uploadedFiles: File[] }) {
  const { control } = useFormContext();

  const roles = [
    {
      id: "referral-coordinator",
      label: "Referral Coordinator",
      description: "Manage people and approvals. Perform Finance and Tech roles",
    },
    {
      id: "doctor",
      label: "Doctor",
      description: "Set up system integrations",
    },
    {
      id: "operation-manager",
      label: "Operation Manager",
      description: "Access order history, invoices, and credit notes",
    },
  ];

  return (
    <div className="mx-auto w-full">
      <Tabs className="mb-4" defaultValue="email">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="email">Invite by email</TabsTrigger>
          <TabsTrigger value="spreadsheet">Upload a spreadsheet</TabsTrigger>
        </TabsList>
        <TabsContent value="email">
          <div className="space-y-6">
            <CustomFormInput
              error={errors.organization_member?.[0]?.member_email?.message}
              label="Enter email address"
              name="organization_member[0].member_email"
              placeholder="Enter email address"
            />

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Assign their roles</Label>
                <Controller
                  control={control}
                  name="organization_member[0].member_role"
                  render={({ field }) => (
                    <div className="grid gap-4">
                      {roles.map(role => {
                        const isChecked = String(field.value) === role.id;

                        return (
                          <div className="flex items-start space-x-4 py-2" key={role.id}>
                            <Checkbox
                              checked={isChecked}
                              className="mt-1"
                              id={role.id}
                              onCheckedChange={checked => field.onChange(checked ? role.id : "")}
                            />
                            <div className="grid gap-1.5">
                              <Label className="font-normal leading-none" htmlFor={role.id}>
                                {role.label}
                              </Label>
                              <p className="text-sm text-muted-foreground">{role.description}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="spreadsheet">
          <p className="py-4">
            Attachment Document {uploadedFiles.length > 0 && `(${uploadedFiles.length})`}
          </p>
          <div className="flex items-center justify-center">
            <FileUploader
              accept={{
                "application/pdf": [".pdf"],
                "application/msword": [".doc"],
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
                  ".docx",
                ],
              }}
              maxFileCount={8}
              maxSize={8 * 1024 * 1024}
              onValueChange={setUploadedFiles}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

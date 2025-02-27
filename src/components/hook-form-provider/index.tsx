import { FormProvider as Form, UseFormReturn, FieldValues } from "react-hook-form";
import { ReactNode } from "react";

interface FormProviderProps<T extends FieldValues> {
  children: ReactNode;
  onSubmit: (data: T) => void;
  methods: UseFormReturn<T>;
  backgroundColor?: string;
}

export default function FormProvider<T extends FieldValues>({
  children,
  onSubmit,
  methods,
  backgroundColor,
}: FormProviderProps<T>) {
  return (
    <Form {...methods}>
      <form
        id="submit-hook-form"
        onSubmit={event => {
          event.preventDefault();
          void methods.handleSubmit(onSubmit, errors =>
            console.log("Validation Errors:", errors)
          )();
        }}
        style={{ width: "100%", backgroundColor }}
      >
        {children}
      </form>
    </Form>
  );
}

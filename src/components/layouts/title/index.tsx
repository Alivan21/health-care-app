interface Props {
  title: string;
  description?: string;
}

export default function Title({ title, description }: Props) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-semibold">{title}</h1>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
}

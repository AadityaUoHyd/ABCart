import { twMerge } from "tailwind-merge";

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const formattedPrice = amount?.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  });

  return (
      <span className={twMerge("text-sm font-semibold text-darkText", className)}>
      {formattedPrice}
    </span>
  );
};

export default PriceFormatter;

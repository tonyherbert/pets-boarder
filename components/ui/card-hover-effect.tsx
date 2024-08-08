import { cn } from "@/lib/utils";
import { Pet } from "@/types/Pets";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

// Update the HoverEffect component to use Pet type
export const HoverEffect = ({
  pets,
  className,
}: {
  pets: Pet[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
        className
      )}
    >
      {pets.map((pet, idx) => (
        <Link
          href={`/pets/${pet.id}`}
          key={pet.id}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-card block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <CardHeader>
              <div className="text-lg font-semibold">{pet.name} {pet.gender === 'male' ? '♂' : '♀'}</div>
              <div className="text-sm text-zinc-400">{pet.race}</div>
              <div className="text-xs text-zinc-300">{pet.birthDate}</div>
            </CardHeader>
            <hr className="border-zinc-200 mt-2" />
             <CardDescription>
              <DetailItem label="Lof number" value={pet.lof} />
              <DetailItem label="Chip number" value={pet.chipNumber} />
            </CardDescription>
              <CardFooter petId={pet.id} />

          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-card border border-transparent dark:border-white/[0.2] group-hover:border-zinc-100 relative z-1",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={cn("text-zinc-100 space-y-2", className)}>
      {children}
    </div>
  );
};

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "mt-8 text-zinc-100 tracking-wide leading-relaxed text-sm",
      className
    )}
  >
    {children}
  </div>
);

export const CardFooter = ({ petId }: { petId: string }) => (
  <div className="flex justify-center mt-4">
    <Link legacyBehavior href={`pets/${petId}`}>
      <a className="custom-button">
        More Details
      </a>
    </Link>
  </div>
);

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col items-center text-sm font-extralight mb-2">
    <span>{label}</span>
    <span className="font-semibold mt-1">{value}</span>
  </div>
);


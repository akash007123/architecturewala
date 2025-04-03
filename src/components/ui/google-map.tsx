import { HTMLAttributes, useRef } from "react";
import { cn } from "@/lib/utils";

interface GoogleMapProps extends HTMLAttributes<HTMLDivElement> {}

const GoogleMap = ({ className, ...props }: GoogleMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={mapRef}
      className={cn("bg-neutral-100 rounded-lg overflow-hidden", className)}
      {...props}
    >
      <div className="w-full h-full flex items-center justify-center bg-neutral-200 text-neutral-400">
        <span className="flex items-center">
          <i className='bx bx-map-alt text-xl mr-2'></i> 
          123 Architecture Avenue, New York
        </span>
      </div>
    </div>
  );
};

export default GoogleMap;

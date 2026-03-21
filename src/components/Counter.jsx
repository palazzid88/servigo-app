"use client";

import { useEffect, useRef, useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);

          let start = 0;
          const end = 271;
          const duration = 2000;
          const stepTime = Math.floor(duration / end);

          const timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start >= end) clearInterval(timer);
          }, stepTime);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [started]);

  return (
    <section ref={ref} className="my-16 flex flex-col items-center">
      <h2 className="text-2xl bg-[#f29101] text-white px-6 py-2 rounded-full font-semibold">
        Total de Servicios Realizados
      </h2>

      <div className="text-4xl font-bold text-[#f29101] mt-4">
        {count}
      </div>
    </section>
  );
}
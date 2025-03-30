"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.scss";
import { Discipline } from "@/types/discipline";

export default function Home() {
  const [disciplines, setDisciplines] = useState<Discipline[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchDisciplines = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/api/disciplines", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });
        const data = await response.json();
        setDisciplines(data);
      } catch (error) {
        console.error("Error fetching disciplines:", error);
      }
    };

    fetchDisciplines();
  }, []);

  const handleDisciplineClick = (id: number) => {
    router.push(`/discipline/${id}`);
  };

  return (
    <div className="container">
      <h1 className={styles.title}>Учебные дисциплины</h1>
      <div className={styles.disciplinesList}>
        {disciplines.map((discipline) => (
          <div
            key={discipline.id}
            className={styles.disciplineCard}
            onClick={() => handleDisciplineClick(discipline.id)}
          >
            <h2 className={styles.disciplineName}>{discipline.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

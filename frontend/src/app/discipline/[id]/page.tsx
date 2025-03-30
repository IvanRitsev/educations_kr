"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Discipline } from "@/types/discipline";
import Link from "next/link";
import styles from "./page.module.scss";

export default function DisciplinePage() {
  const [discipline, setDiscipline] = useState<Discipline | null>(null);
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const fetchDiscipline = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/disciplines/${id}`
        );
        const data = await response.json();
        setDiscipline(data);
      } catch (error) {
        console.error("Error fetching discipline:", error);
      }
    };

    fetchDiscipline();
  }, [id]);

  if (!discipline) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loader}></div>
        <p className={styles.loaderText}>Загрузка дисциплины...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <Link href="/ ">Главная </Link>
      <span>/</span>
      <Link href={`/discipline/${discipline.id}`}> {discipline.name}</Link>

      <div>
        <h1 className={styles.title}>{discipline.name}</h1>
        <div className={styles.disciplineContent}>
          <h3>Описание:</h3>
          <p className={styles.text}>{discipline.description}</p>
          <h3>Сложность</h3>
          <p className={styles.text}>{discipline.difficulty}</p>
          <h3>Популярные темы:</h3>
          <div className={styles.topicWrapper}>
            {discipline.popular_topics.map((topic, index) => (
              <div key={index} className={styles.topic}>
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

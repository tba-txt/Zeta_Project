import React, { createContext, useState, useContext, useEffect } from 'react';

type Lesson = { id: string; title: string; done: boolean; };
type Module = { id: string; title: string; lessons: Lesson[]; };

const initialMock: Module[] = [
  {
    id: 'm1',
    title: 'Módulo 1 — Fundamentos de Infraestruturas Autônomas',
    lessons: [
      { id: 'l1', title: 'Introdução às Infraestruturas', done: false },
      { id: 'l2', title: 'Arquiteturas Autônomas', done: false },
      { id: 'l3', title: 'Casos de Uso', done: false },
    ],
  },
  {
    id: 'm2',
    title: 'Módulo 2 — Automação em Ambientes Híbridos',
    lessons: [
      { id: 'l4', title: 'Orquestração de Workloads Multi-Cluster', done: false },
      { id: 'l5', title: 'Previsão de Falhas com Modelos Preditivos', done: false },
      { id: 'l6', title: 'Respostas Autônomas a Incidentes', done: false },
    ],
  },
  {
    id: 'm3',
    title: 'Módulo 3 — Gestão e Observabilidade',
    lessons: [
      { id: 'l7', title: 'Monitoramento e Telemetria', done: false },
      { id: 'l8', title: 'SLA e SLO em Infraestruturas Inteligentes', done: false },
    ],
  },
];

type CourseContextType = {
  iaEnrolled: boolean;
  setIaEnrolled: (v: boolean) => void;
  iaFinished: boolean;
  setIaFinished: (v: boolean) => void;
  modules: Module[]; 
  toggleLesson: (moduleId: string, lessonId: string) => void; 
  resetCourse: () => void; 
};

const CourseContext = createContext<CourseContextType>({} as CourseContextType);

export const CourseProvider = ({ children }: any) => {
  const [iaEnrolled, setIaEnrolled] = useState(false);
  const [iaFinished, setIaFinished] = useState(false);
  
  const [modules, setModules] = useState<Module[]>([]); 

  const resetCourse = () => {
    setModules(JSON.parse(JSON.stringify(initialMock)));
    setIaEnrolled(true);
    setIaFinished(false);
  };

  const toggleLesson = (moduleId: string, lessonId: string) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === moduleId
          ? {
              ...m,
              lessons: m.lessons.map((l) => (l.id === lessonId ? { ...l, done: !l.done } : l)),
            }
          : m
      )
    );
  };

  useEffect(() => {
    if (modules.length === 0) return;

    let total = 0;
    let done = 0;
    modules.forEach(m => {
        total += m.lessons.length;
        done += m.lessons.filter(l => l.done).length;
    });

    if (total > 0 && total === done && iaEnrolled) {
        setIaFinished(true);
    } else {
        setIaFinished(false);
    }
  }, [modules, iaEnrolled]);

  return (
    <CourseContext.Provider value={{ 
        iaEnrolled, setIaEnrolled, 
        iaFinished, setIaFinished,
        modules, toggleLesson, resetCourse 
    }}>
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => useContext(CourseContext);
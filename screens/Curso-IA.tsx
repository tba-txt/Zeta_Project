import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCourse } from '../context/CourseContext';

const { width } = Dimensions.get('window');

export default function CursoIA({ navigation }: any) {
  const { 
    iaEnrolled, 
    iaFinished, 
    modules,     
    toggleLesson,
    resetCourse   
  } = useCourse();

  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    if (modules.length === 0) {
        setProgress(0);
        return;
    }
    const totals = modules.reduce(
      (acc, m) => {
        acc.total += m.lessons.length;
        acc.done += m.lessons.filter((l) => l.done).length;
        return acc;
      },
      { total: 0, done: 0 }
    );
    if (totals.total === 0) setProgress(0);
    else setProgress(Math.round((totals.done / totals.total) * 100));
  }, [modules]);

  const toggleModule = (id: string) => {
    setOpenModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleEnroll = () => {
    resetCourse(); 
    setOpenModules({ 'm1': true });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <Image
          source={require('../assets/LogoMenor.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={{ width: 24 }} />
      </View>

      <Image source={require('../assets/curso1.jpg')} style={styles.heroImage} />

      <View style={styles.metaRow}>
        <View style={styles.tagBox}><Text style={styles.tagText}>Curso</Text></View>
        <View style={styles.tagBox}><Text style={styles.tagText}>I.A</Text></View>
        <View style={styles.tagBox}><Text style={styles.tagText}>Grátis</Text></View>
        
        <View style={[styles.tagBox, { backgroundColor: iaEnrolled ? '#2bb673' : '#eee', marginLeft: 6 }]}>
          <Text style={[styles.tagText, { color: iaEnrolled ? '#fff' : '#e60000' }]}>
            {iaFinished ? 'Concluído' : iaEnrolled ? 'Inscrito' : 'Não inscrito'}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Orquestração de Infraestruturas Autônomas com IA</Text>
        <Text style={styles.description}>
          Aprenda a automatizar cargas de trabalho, prever falhas e operar ambientes híbridos usando
          arquiteturas autônomas impulsionadas por IA. Domine a próxima geração de gestão de data
          centers inteligentes.
        </Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Duração:</Text>
          <Text style={styles.infoValue}>6 horas</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Módulos:</Text>
          <Text style={styles.infoValue}>3 módulos</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Nível:</Text>
          <Text style={styles.infoValue}>Avançado</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          {!iaEnrolled ? (
            <TouchableOpacity style={styles.enrollButton} onPress={handleEnroll}>
              <Text style={styles.enrollButtonText}>INSCREVER-SE</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.enrollButton, { backgroundColor: '#2bb673' }]}
              disabled={true}
            >
              <Text style={styles.enrollButtonText}>
                 {iaFinished ? 'CERTIFICADO DISPONÍVEL' : 'INSCRITO'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.modulesCard}>
        <Text style={styles.modulesTitle}>Módulos</Text>

        {!iaEnrolled ? (
          <View style={{ paddingVertical: 20 }}>
            <Text style={{ color: '#666', textAlign: 'center' }}>
              Você ainda não está inscrito neste curso. Clique em INSCREVER-SE para ver os módulos e
              acompanhar seu progresso.
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.progressLabel}>Progresso: {progress}%</Text>
            
            <View style={styles.progressBarBackground}>
              <View 
                style={[
                  styles.progressBarFill, 
                  { 
                    width: `${progress}%`,
                    backgroundColor: progress === 100 ? '#2bb673' : '#42a5f5' 
                  }
                ]} 
              />
            </View>

            <View style={{ marginTop: 12 }}>
              {modules.map((mod) => {
                const isOpen = !!openModules[mod.id];
                const total = mod.lessons.length;
                const doneCount = mod.lessons.filter((l) => l.done).length;
                return (
                  <View key={mod.id} style={styles.moduleBlock}>
                    <TouchableOpacity
                      style={styles.moduleHeader}
                      onPress={() => toggleModule(mod.id)}
                    >
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.moduleIcon}>
                          <Ionicons name="book" size={16} color="#fff" />
                        </View>
                        <View style={{ marginLeft: 10, maxWidth: width - 140 }}>
                          <Text style={styles.moduleTitle} numberOfLines={2}>
                            {mod.title}
                          </Text>
                          <Text style={styles.moduleSubtitle}>
                            {doneCount}/{total} concluídos
                          </Text>
                        </View>
                      </View>
                      <View style={styles.chevBox}>
                        <Ionicons
                          name={isOpen ? 'chevron-up' : 'chevron-down'}
                          size={22}
                          color="#222"
                        />
                      </View>
                    </TouchableOpacity>

                    {isOpen && (
                      <View style={styles.moduleContent}>
                        {mod.lessons.map((lesson) => (
                          <View key={lesson.id} style={styles.lessonRow}>
                            <TouchableOpacity
                              style={styles.lessonLeft}
                              onPress={() => toggleLesson(mod.id, lesson.id)}
                            >
                              <Ionicons
                                name={lesson.done ? 'checkbox-outline' : 'square-outline'}
                                size={20}
                                color={lesson.done ? '#2bb673' : '#333'}
                              />
                              <Text style={styles.lessonTitle}>{lesson.title}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity>
                              <Ionicons name="ellipsis-vertical" size={18} color="#888" />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 50, 
    paddingHorizontal: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
  },
  backButton: { padding: 8 },
  logo: { width: 120, height: 36 },
  heroImage: {
    width: width,
    height: width * 0.55,
    resizeMode: 'cover',
  },
  metaRow: {
    flexDirection: 'row',
    paddingHorizontal: 18,
    marginTop: 12,
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8 as any,
  },
  tagBox: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#000',
    borderRadius: 6,
    marginRight: 8,
  },
  tagText: { color: '#fff', fontSize: 12 },
  content: { paddingHorizontal: 18, paddingTop: 12 },
  title: { fontSize: 20, fontWeight: '700', marginBottom: 8, color: '#111' },
  description: { fontSize: 14, color: '#444', lineHeight: 20, marginBottom: 12 },
  infoRow: { flexDirection: 'row', marginBottom: 6 },
  infoLabel: { fontWeight: '700', marginRight: 8, color: '#111' },
  infoValue: { color: '#333' },
  enrollButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  enrollButtonText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  modulesCard: {
    marginTop: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  modulesTitle: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  progressLabel: { color: '#666', fontSize: 13, marginBottom: 6 },
  progressBarBackground: {
    width: '100%',
    height: 14,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
  },
  moduleBlock: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  moduleHeader: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moduleIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleTitle: { fontWeight: '700', fontSize: 14, color: '#111' },
  moduleSubtitle: { fontSize: 12, color: '#888', marginTop: 2 },
  chevBox: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleContent: { paddingHorizontal: 12, paddingBottom: 12, paddingTop: 6 },
  lessonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  lessonLeft: { flexDirection: 'row', alignItems: 'center' },
  lessonTitle: { marginLeft: 10, fontSize: 13, color: '#333' },
});
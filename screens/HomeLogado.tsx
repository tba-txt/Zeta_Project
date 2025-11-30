import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import { useCourse } from '../context/CourseContext'; 

const courses = [
  { 
    id: 1, 
    title: 'Orquestração de Infraestruturas Autônomas com IA', 
    image: require('../assets/curso1.jpg'),
    tag: 'I.A'
  },
  { 
    id: 2, 
    title: 'Segurança Zero-Trust Distribuída em Nuvens', 
    image: require('../assets/curso2.jpg'),
    tag: 'Cloud'
  },
  { 
    id: 3, 
    title: 'Redes Quânticas e Comunicação pós-Quântica', 
    image: require('../assets/curso3.jpg'),
    tag: 'Quantum'
  },
];

export default function HomeLogado() {
  const navigation = useNavigation<any>();
  
  const { iaEnrolled, iaFinished } = useCourse();

  const renderMiniCard = (course: any) => (
    <View key={course.id} style={styles.miniCard}>
       <Image source={course.image} style={styles.miniCardImage} />
       <View style={{flex: 1, paddingHorizontal: 10}}>
          <Text style={styles.miniCardTitle}>{course.title}</Text>
          <Text style={styles.miniCardTag}>{course.tag}</Text>
       </View>
       <TouchableOpacity 
         style={styles.continueButton}
         onPress={() => navigation.navigate('CursoIA')}
       >
         <Text style={styles.continueButtonText}>
            {iaFinished ? 'VER CERTIFICADO' : 'CONTINUAR'}
         </Text>
       </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Image 
          source={require('../assets/LogoMenor.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <Text style={styles.sectionTitle}>Cursos Disponíveis</Text>
        
        <View style={styles.carouselContainer}>
          <Ionicons name="chevron-back" size={30} color="#ccc" />
          
          <ScrollView 
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselScroll}
          >
            {courses.map((course) => {
              const isAvailable = course.id === 1;

              return (
                <View key={course.id} style={styles.card}>
                  <Image source={course.image} style={styles.cardImage} />
                  
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle} numberOfLines={3}>
                      {course.title}
                    </Text>
                    
                    {isAvailable ? (
                      <TouchableOpacity 
                        style={styles.registerButton}
                        onPress={() => navigation.navigate('CursoIA')}
                      >
                        <Text style={styles.registerButtonText}>
                          {iaEnrolled ? 'ACESSAR CURSO' : 'REGISTRE-SE AGORA!'}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View style={[styles.registerButton, { backgroundColor: '#ccc' }]}>
                        <Text style={styles.registerButtonText}>EM CONSTRUÇÃO</Text>
                      </View>
                    )}

                  </View>
                </View>
              );
            })}
          </ScrollView>

          <Ionicons name="chevron-forward" size={30} color="#333" />
        </View>

        <Text style={styles.sectionTitle}>Meus Cursos</Text>
        
        {iaEnrolled && !iaFinished ? (
           <View style={{ paddingHorizontal: 20 }}>
             {renderMiniCard(courses[0])}
           </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Vazio por enquanto... Registre-se em um novo curso e comece a aprender hoje mesmo! ^.^
            </Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>Cursos Finalizados</Text>

        {iaFinished ? (
           <View style={{ paddingHorizontal: 20 }}>
             {renderMiniCard(courses[0])}
           </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Vazio por enquanto... Finalize seus cursos e obtenha o seu certificado! ^.^
            </Text>
          </View>
        )}

        <View style={{ height: 50 }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  logo: { width: 120, height: 40 },
  scrollContent: { paddingVertical: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginBottom: 15,
    marginTop: 10,
    color: '#000',
  },
  
  carouselContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 30 },
  carouselScroll: { paddingHorizontal: 10 },
  card: {
    width: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 100, resizeMode: 'cover' },
  cardContent: { padding: 10, alignItems: 'center' },
  cardTitle: { fontSize: 12, fontWeight: 'bold', textAlign: 'left', marginBottom: 10, height: 45 },
  registerButton: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 15,
    width: '100%',
  },
  registerButtonText: { color: '#fff', fontSize: 9, fontWeight: 'bold', textAlign: 'center' },

  miniCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 10
  },
  miniCardImage: { width: 50, height: 50, borderRadius: 4 },
  miniCardTitle: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  miniCardTag: { fontSize: 10, color: '#666', marginTop: 2 },
  continueButton: { backgroundColor: '#2bb673', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4 },
  continueButtonText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },

  emptyContainer: { marginHorizontal: 20, marginBottom: 30, padding: 20, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#888', textAlign: 'center', fontSize: 14, lineHeight: 20 },
});
import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Dimensions,
  LayoutChangeEvent,
  Image,     
  ImageBackground,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

interface Coords {
  sobre: number;
  cursos: number;
}

type SectionName = keyof Coords;

const { width } = Dimensions.get('window');

export default function PreLogin() {

  const navigation = useNavigation<any>(); 
  const scrollRef = useRef<ScrollView>(null);

  const [coords, setCoords] = useState<Coords>({ sobre: 0, cursos: 0 });

  const [filter, setFilter] = useState<string>("Todos");
  const [menuVisible, setMenuVisible] = useState(false);

  const scrollToSection = (section: SectionName) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        y: coords[section],
        animated: true,
      });
    }
  };

  const cursos = [
    {
      titulo: "Orquestração de Infraestruturas Autônomas com IA",
      tag: "I.A",
      descricao:
        "Aprenda a automatizar cargas de trabalho, prever falhas e operar ambientes híbridos usando arquiteturas autônomas.",
      img: require("../assets/curso1.jpg")
    },
    {
      titulo: "Segurança Zero-Trust Distribuída em Nuvens",
      tag: "Cloud",
      descricao:
        "Implemente políticas zero-trust em escala global, detecte ameaças em tempo real e proteja microsserviços.",
      img: require("../assets/curso2.jpg")
    },
    {
      titulo: "Redes Quânticas e Comunicação pós-Quântica",
      tag: "Q.C",
      descricao:
        "Explore redes quânticas e algoritmos pós-quânticos para comunicações ultrasseguras.",
      img: require("../assets/curso3.jpg")
    }
  ];

  const cursosFiltrados = cursos.filter(
    c => filter === "Todos" || c.tag === filter
  );

  return (
    <View style={styles.container}>

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
      >
        <View style={styles.menuOverlay}>
          <View style={styles.menuBox}>
            <TouchableOpacity 
              style={styles.menuClose}
              onPress={() => setMenuVisible(false)}
            >
              <Ionicons name="close" size={28} color="#000"/>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Login");
              }}>
              <Text style={styles.menuText}>Realizar Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.menuItem}
              onPress={() => {
                setMenuVisible(false);
                navigation.navigate("Register");
              }}>
              <Text style={styles.menuText}>Criar Conta</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image 
              source={require('../assets/LogoMenor.png')} 
              style={{ width: 150, height: 40, resizeMode: 'contain' }} 
          />
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <Ionicons name="menu" size={30} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        ref={scrollRef}
        style={styles.scrollView}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}
      >

        <ImageBackground 
          source={require('../assets/SeuFuturoComecaGif.gif')} 
          style={styles.heroSection}
          imageStyle={{ opacity: 0.6 }}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>O seu futuro começa</Text>
            <Text style={[styles.heroTitle, styles.heroTitleHighlight]}>aqui</Text>
            <View style={styles.separator} />
          </View>
        </ImageBackground>

        <View 
          style={styles.sectionContainer}
          onLayout={(event: LayoutChangeEvent) => {
            const layout = event.nativeEvent.layout;
            setCoords(prev => ({ ...prev, sobre: layout.y }));
          }}
        >
          <Text style={styles.sectionTitle}>
            Muito prazer! Nós somos a plataforma {'\n'}
            <Text style={{fontWeight: 'bold'}}>Zeta Project</Text>
          </Text>

          <Text style={styles.sectionDescription}>
            Somos uma plataforma de cursos de tecnologia diferenciada! Buscamos a excelência e o máximo desempenho. Seja bem-vindo.
          </Text>
          
          <TouchableOpacity style={styles.blackButton}>
            <Text style={styles.buttonTextWhite}>CONFERIR</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View 
          style={styles.sectionContainer}
          onLayout={(event: LayoutChangeEvent) => {
            const layout = event.nativeEvent.layout;
            setCoords(prev => ({ ...prev, cursos: layout.y }));
          }}
        >

          <Text style={styles.sectionHeader}>Confira nossos cursos</Text>

          <View style={styles.filterRow}>
            {["Todos", "I.A", "Cloud", "Q.C"].map(f => (
              <TouchableOpacity 
                key={f}
                style={[
                  styles.filterButton,
                  filter === f && styles.filterButtonActive,
                ]}
                onPress={() => setFilter(f)}
              >
                <Text 
                  style={[
                    styles.filterButtonText,
                    filter === f && styles.filterButtonTextActive
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {cursosFiltrados.map((c, index) => (
            <View key={index} style={styles.card}>
              <Image 
                source={c.img}
                style={styles.cardImage}
              />
              <View style={styles.cardContent}>
                <View style={styles.cardTitleRow}>
                  <Text style={styles.cardTitle}>{c.titulo}</Text>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{c.tag}</Text>
                  </View>
                </View>

                <Text style={styles.cardDescription}>{c.descricao}</Text>

                <TouchableOpacity style={styles.blackButtonSmall}>
                  <Text style={styles.buttonTextWhite}>REGISTRE-SE AGORA!</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}

        </View>

        <View style={styles.divider} />

        <View style={styles.ctaContainer}>
          <Text style={styles.ctaText}>
            Vem ser <Text style={styles.grayZ}>Z</Text>eta!
          </Text>
        </View>

        <View style={styles.footer}>

          <TouchableOpacity 
            style={styles.footerItem} 
            onPress={() => scrollToSection('sobre')}
          >
            <Text style={styles.footerText}>Sobre a Zeta Project</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.footerItem}
            onPress={() => scrollToSection('cursos')}
          >
            <Text style={styles.footerText}>Cursos que oferecemos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.footerItem}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.footerText}>Realizar Login</Text>
          </TouchableOpacity>

        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50, 
    paddingBottom: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loginLink: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 20,
  },
  heroSection: {
    backgroundColor: '#000',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heroContent: {
    alignItems: 'center',
  },
  separator: {
    height: 10,
  },
  heroTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  heroTitleHighlight: {
    color: '#fff',
    fontSize: 32,
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: '#000',
    borderColor: '#fff',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  registerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  sectionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  sectionDescription: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  blackButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  blackButtonSmall: {
    backgroundColor: '#000',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'stretch',
    marginTop: 10,
  },
  buttonTextWhite: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    width: '90%',
    alignSelf: 'center',
  },
  filterContainer: {
    width: '100%',
    flexDirection: 'column',
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '100%',
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee'
  },
  cardImage: {
    height: 150,
    width: '100%',
  },
  cardContent: {
    padding: 15,
  },
  cardTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: '80%',
  },
  tag: {
    borderWidth: 1,
    borderColor: '#000',
    paddingHorizontal: 5,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 15,
  },
  ctaContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  ctaText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  grayZ: {
    color: '#999',
  },
  footer: {
    backgroundColor: '#000',
    paddingVertical: 40,
    paddingHorizontal: 20,
    width: '100%',
  },
  footerItem: {
    marginBottom: 15,
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold', 
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10
  },
  filterButton: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginHorizontal: 5
  },
  filterButtonActive: {
    backgroundColor: "#000"
  },
  filterButtonText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  filterButtonTextActive: {
    color: "#fff"
    },
  menuOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  menuBox: {
    backgroundColor: "#fff",
    width: "70%",
    padding: 25,
    borderRadius: 12,
    alignItems: "flex-start"
  },
  menuClose: {
    alignSelf: "flex-end",
    marginBottom: 10
  },
  menuItem: {
    marginVertical: 10
  },
  menuText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  });
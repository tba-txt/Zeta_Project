import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image, 
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AREA_OPTIONS = [
  { label: 'Inteligência Artificial', value: 'ia' },
  { label: 'Computação em Nuvem', value: 'cloud' },
  { label: 'Computação Quântica', value: 'quantum' }
];

export default function Register() {
  const navigation = useNavigation<any>();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [area, setArea] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<'success' | 'error'>('error');

  const [areaModalVisible, setAreaModalVisible] = useState(false);

  const showCustomAlert = (title: string, message: string, type: 'success' | 'error') => {
    setModalTitle(title);
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    if (modalType === 'success') {
      navigation.navigate('Login');
    }
  };

const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      showCustomAlert('Atenção', 'Todos os campos são obrigatórios.', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showCustomAlert('Erro', 'As senhas não coincidem.', 'error');
      return;
    }

    try {
      const newUser = {
        name: name,
        email: email.trim(), 
        password: password,
        area: area
      };

      await AsyncStorage.setItem('ChaveUser', JSON.stringify(newUser));
      
      const check = await AsyncStorage.getItem('ChaveUser');

      showCustomAlert('Bem-vindo!', 'Conta criada com sucesso!', 'success');
      
    } catch (error) {
      showCustomAlert('Erro', 'Falha ao salvar os dados.', 'error');
    }
  };

  const selectedAreaLabel = AREA_OPTIONS.find(o => o.value === area)?.label ?? 'Selecione uma opção...';

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ImageBackground 
        source={require('../assets/RoxoWallpaper.png')} 
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#000" />
                <Text style={styles.backText}>Voltar</Text>
              </TouchableOpacity>

              <Image 
                source={require('../assets/LogoMaior.png')} 
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.divider} />

            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome..."
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite seu e-mail..."
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite sua senha..."
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />

            <Text style={styles.label}>Confirmar Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Confirme sua senha..."
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />

            <Text style={styles.label}>Área de Interesse Principal</Text>

            <View style={styles.pickerContainer}>
              <TouchableOpacity style={styles.pickerTouchable} onPress={() => setAreaModalVisible(true)}>
                <Text style={area ? styles.pickerTextSelected : styles.pickerPlaceholder}>{selectedAreaLabel}</Text>
                <Ionicons name="chevron-down" size={20} color="#000" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.buttonBlack} onPress={handleRegister}>
              <Text style={styles.buttonText}>REGISTRAR</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={areaModalVisible}
          onRequestClose={() => setAreaModalVisible(false)}
        >
          <TouchableOpacity style={styles.areaModalOverlay} activeOpacity={1} onPress={() => setAreaModalVisible(false)}>
            <View style={styles.areaModalContent}>
              <Text style={styles.areaModalTitle}>Selecione a Área</Text>
              <FlatList
                data={AREA_OPTIONS}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.areaOption}
                    onPress={() => {
                      setArea(item.value);
                      setAreaModalVisible(false);
                    }}
                  >
                    <Text style={styles.areaOptionText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.areaSeparator} />}
                style={styles.areaList}
                nestedScrollEnabled
              />
            </View>
          </TouchableOpacity>
        </Modal>

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Ionicons 
                name={modalType === 'success' ? "checkmark-circle" : "alert-circle"} 
                size={50} 
                color={modalType === 'success' ? "#000" : "#d9534f"} 
              />
              <Text style={styles.modalTitle}>{modalTitle}</Text>
              <Text style={styles.modalMessage}>{modalMessage}</Text>
              
              <TouchableOpacity style={styles.modalButton} onPress={handleModalClose}>
                <Text style={styles.modalButtonText}>
                  {modalType === 'success' ? "IR PARA LOGIN" : "TENTAR NOVAMENTE"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  card: {
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 350,
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontWeight: 'bold',
    marginLeft: 4,
  },
  logo: {
    width: 100,
    height: 60,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 0,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#000',
    marginBottom: 20,
    borderRadius: 0,
    backgroundColor: '#fff',
    height: 50,
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#000',
    backgroundColor: '#fff',
  },
  pickerTouchable: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  pickerPlaceholder: {
    color: '#999',
  },
  pickerTextSelected: {
    color: '#000',
  },
  buttonBlack: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  modalMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 14,
  },
  areaModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  areaModalContent: {
    width: '90%',
    maxWidth: 360,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 10,
    elevation: 6,
  },
  areaModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  areaList: {
    maxHeight: 300,
  },
  areaOption: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  areaOptionText: {
    color: '#000',
    fontSize: 16,
  },
  areaSeparator: {
    height: 1,
    backgroundColor: '#eee',
    marginHorizontal: 0,
  }
});
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 

export default function Profile() {
  const navigation = useNavigation<any>();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nome, setNome] = useState('');
  const [area, setArea] = useState(''); 

  const CHAVE_USER = 'ChaveUser';

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(CHAVE_USER); 
        if (jsonValue != null) {
          const user = JSON.parse(jsonValue); 
          setNome(user.name);
          setEmail(user.email);
          setSenha(user.password);
          setConfirmarSenha(user.password); 
          setArea(user.area);
        }
      } catch(e) {
        Alert.alert('Erro', 'Não foi possível carregar seus dados.');
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem.');
      return;
    }
    try {
      const updatedUser = {
        name: nome,
        email: email,
        password: senha,
        area: area 
      };
      await AsyncStorage.setItem(CHAVE_USER, JSON.stringify(updatedUser));
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (e) {
      Alert.alert('Erro', 'Falha ao salvar alterações.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair da conta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Sair', 
          style: 'destructive',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'PreLogin' }],
            });
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <Image 
          source={require('../assets/LogoMenor.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        <TouchableOpacity onPress={handleLogout} style={styles.headerLogoutButton}>
           <Ionicons name="log-out-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <Text style={styles.screenTitle}>Perfil</Text>

        <View style={styles.avatarContainer}>
          <View style={styles.avatarCircle}>
            <Ionicons name="person-outline" size={80} color="#000" />
          </View>
          <Text style={styles.userName}>{nome || 'Usuário'}</Text>
          <Text style={styles.userEmailDisplay}>{email || 'email@exemplo.com'}</Text>
          <Text style={styles.userAreaDisplay}>{area ? `Área: ${area.toUpperCase()}` : ''}</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Nome</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />

          <Text style={styles.label}>E-mail</Text>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

          <Text style={styles.label}>Senha</Text>
          <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry={true} />

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput style={styles.input} value={confirmarSenha} onChangeText={setConfirmarSenha} secureTextEntry={true} />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.buttonText}>SALVAR ALTERAÇÕES</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.footerSpace} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
  },
  headerLogoutButton: {
    padding: 5, 
  },
  logo: {
    width: 100,
    height: 40,
  },
  content: {
    alignItems: 'center',
    paddingTop: 20,
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '400',
    marginBottom: 20,
    color: '#000',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatarCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  userName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  userEmailDisplay: {
    fontSize: 14,
    color: '#333',
    textDecorationLine: 'underline',
  },
  userAreaDisplay: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    fontWeight: 'bold',
  },
  form: {
    width: '100%',
    paddingHorizontal: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 15,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 10,
    fontSize: 16,
    borderRadius: 0,
    height: 45,
  },
  saveButton: {
    backgroundColor: '#000',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  footerSpace: {
    height: 50
  }
});